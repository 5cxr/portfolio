import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ActivityHeatmap from '@/components/ActivityHeatmap';
import About from '@/components/About';
import Stack from '@/components/Stack';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Hobbies from '@/components/Hobbies';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-24 space-y-28">
        <ActivityHeatmap />
        <About />
        <Stack />
        <Projects />
        <Experience />
        <Hobbies />
      </div>
      <Footer />
    </main>
  );
}
