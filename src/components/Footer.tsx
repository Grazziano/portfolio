import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-12 border-t">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center px-4">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">
              Grazziano <span className="text-primary">Portfolio</span>
            </h3>
            <p className="text-muted-foreground mt-2">
              Building the web, one line at a time.
            </p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://github.com/Grazziano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/grazziano-fagundes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://twitter.com/grazzianobf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>

        <div className="border-t border-border/80 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Grazziano Portfolio. All rights reserved.</p>
          <p className="mt-2">
            Designed & Built with Next, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
