'use client';

// Shader (noise fn + topo-field composition) adapted from @designcodeio/threeui's
// "Topo Field" effect (github.com/MengTo/threeui), MIT License, Copyright (c) ThreeUI.
// Rebuilt here as a standalone WebGL component (no iframe/Tailwind/GSAP/Iconify deps).

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const VERTEX_SOURCE = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const NOISE_FUNCTIONS = `
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
  }
`;

// Mode-specific line intensity + color composition, mirrors the light/dark
// patch @designcodeio/threeui applies to the authored topo-field shader.
function colorBlock(mode: 'dark' | 'light') {
  if (mode === 'light') {
    return `
      gridLines = clamp(gridLines, 0.0, 1.0) * 0.55;
      float topoLines = smoothstep(0.03, 0.00, triangleWave) * 0.95;
      vec3 paper = vec3(0.933, 0.945, 0.965);
      vec3 ink = vec3(0.12, 0.14, 0.18);
      float lines = clamp(gridLines + topoLines, 0.0, 1.0);
      vec3 color = mix(paper, ink, lines);
    `;
  }
  return `
    gridLines = clamp(gridLines, 0.0, 1.0) * 0.12;
    float topoLines = smoothstep(0.02, 0.00, triangleWave) * 0.45;
    vec3 color = vec3(0.0);
    color += vec3(1.0) * gridLines;
    color += vec3(1.0) * topoLines;
  `;
}

function buildFragmentSource(mode: 'dark' | 'light', length: number, density: number) {
  const noiseScale = (1.4 * length).toFixed(3);
  const numBands = (10 * density).toFixed(2);
  return `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_dpr;

    ${NOISE_FUNCTIONS}

    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        float gridSize = 48.0 * u_dpr;
        vec2 gridSt = gl_FragCoord.xy / gridSize;
        vec2 gridFract = fract(gridSt);
        float lineThickness = 1.0 / gridSize;
        float gridLines = step(1.0 - lineThickness, gridFract.x) + step(1.0 - lineThickness, gridFract.y);

        float noiseScale = ${noiseScale};
        vec2 noisePos = st * noiseScale + vec2(u_time * 0.015, u_time * 0.025);
        float n = snoise(noisePos) * 0.5 + 0.5;
        float numBands = ${numBands};
        float bandVal = n * numBands;
        float triangleWave = abs(fract(bandVal) - 0.5) * 2.0;

        ${colorBlock(mode)}

        gl_FragColor = vec4(color, 1.0);
    }
  `;
}

const FRAME_INTERVAL_MS = 1000 / 30;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

interface ConstellationBackgroundProps {
  length?: number;
  density?: number;
  speed?: number;
  opacity?: number;
}

interface GLState {
  gl: WebGLRenderingContext;
  positionBuffer: WebGLBuffer;
  program: WebGLProgram | null;
  vertexShader: WebGLShader | null;
  fragmentShader: WebGLShader | null;
  resolutionLocation: WebGLUniformLocation | null;
  timeLocation: WebGLUniformLocation | null;
  dprLocation: WebGLUniformLocation | null;
  speed: number;
}

export default function ConstellationBackground({
  length = 1,
  density = 1,
  speed = 1,
  opacity = 1,
}: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GLState | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const mode: 'dark' | 'light' = mounted && resolvedTheme === 'dark' ? 'dark' : 'light';

  // Persistent context + resize + render loop — created once, survives theme/prop changes.
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const positionBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const state: GLState = {
      gl,
      positionBuffer,
      program: null,
      vertexShader: null,
      fragmentShader: null,
      resolutionLocation: null,
      timeLocation: null,
      dprLocation: null,
      speed,
    };
    stateRef.current = state;

    function resizeCanvas() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      state.gl.viewport(0, 0, canvas.width, canvas.height);
      if (state.resolutionLocation) state.gl.uniform2f(state.resolutionLocation, canvas.width, canvas.height);
      if (state.dprLocation) state.gl.uniform1f(state.dprLocation, dpr);
    }
    window.addEventListener('resize', resizeCanvas);
    (canvas as HTMLCanvasElement & { __resize?: () => void }).__resize = resizeCanvas;

    let rafId = 0;
    let lastFrame = 0;
    const startTime = performance.now();

    function render(now: number) {
      rafId = requestAnimationFrame(render);
      if (now - lastFrame < FRAME_INTERVAL_MS) return;
      lastFrame = now;
      if (!state.program || !state.timeLocation) return;
      state.gl.uniform1f(state.timeLocation, (now - startTime) * 0.001 * state.speed);
      state.gl.drawArrays(state.gl.TRIANGLE_STRIP, 0, 4);
    }
    rafId = requestAnimationFrame(render);

    function handleContextLost(e: Event) {
      e.preventDefault();
      cancelAnimationFrame(rafId);
    }
    canvas.addEventListener('webglcontextlost', handleContextLost);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      if (state.program) gl.deleteProgram(state.program);
      if (state.vertexShader) gl.deleteShader(state.vertexShader);
      if (state.fragmentShader) gl.deleteShader(state.fragmentShader);
      gl.deleteBuffer(positionBuffer);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      stateRef.current = null;
    };
  }, [mounted]);

  // Recompile the shader program on mode/prop change — reuses the existing context.
  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;
    const { gl } = state;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SOURCE);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, buildFragmentSource(mode, length, density));
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, state.positionBuffer);
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const oldProgram = state.program;
    const oldVertexShader = state.vertexShader;
    const oldFragmentShader = state.fragmentShader;

    state.program = program;
    state.vertexShader = vertexShader;
    state.fragmentShader = fragmentShader;
    state.resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    state.timeLocation = gl.getUniformLocation(program, 'u_time');
    state.dprLocation = gl.getUniformLocation(program, 'u_dpr');
    state.speed = speed;

    const canvas = canvasRef.current as (HTMLCanvasElement & { __resize?: () => void }) | null;
    canvas?.__resize?.();

    if (oldProgram) gl.deleteProgram(oldProgram);
    if (oldVertexShader) gl.deleteShader(oldVertexShader);
    if (oldFragmentShader) gl.deleteShader(oldFragmentShader);
  }, [mounted, mode, length, density, speed]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        opacity,
      }}
    />
  );
}
