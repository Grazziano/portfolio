'use client';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';
import RotatingText from './RotatingText';

function Hero() {
  const handleSmoothScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex justify-center items-center px-4 md:px-8 lg:px-16"
    >
      <div className="section-container">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I&apos;m{' '}
              <span className="text-primary dark:text-blue-400">
                Grazziano Fagundes
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-6">
              <RotatingText />
            </h2>
            <p className="text-lg mb-8">
              I build responsive web applications with modern technologies.
              Passionate about creating intuitive user experiences and clean,
              efficient code.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">View My Work</a>
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center animate-fade-in">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
              <img
                src="https://github.com/Grazziano.png"
                alt="Grazziano Fagundes"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <a
            href="#about"
            aria-label="Scroll down"
            onClick={handleSmoothScroll}
          >
            <ArrowDown className="text-primary" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
