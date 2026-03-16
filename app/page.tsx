import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Announcements from './components/Announcements';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Announcements />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
