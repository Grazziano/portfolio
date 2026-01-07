'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { LogOutIcon, Menu } from 'lucide-react';
// import ThemeToggle from './ThemeToggle';
import { ModeToggle } from './ModeToggle';
import { signOut, useSession } from 'next-auth/react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const [usersCount, setUsersCount] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkCount = async () => {
      try {
        const res = await fetch('/api/users/count', { cache: 'no-store' });
        const data = await res.json();
        setUsersCount(typeof data?.count === 'number' ? data.count : 0);
      } catch {
        setUsersCount(0);
      }
    };
    checkCount();
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Função para scroll suave
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Fecha o menu mobile (se estiver aberto)
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="text-xl font-bold"
            onClick={(e) => handleSmoothScroll(e, '#home')}
          >
            Grazziano <span className="text-primary">Portfolio</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-foreground/80 hover:text-foreground transition-colors"
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            {/* <ThemeToggle /> */}
            <ModeToggle />
            <div className="flex items-center gap-2">
              {isLoggedIn && (
                <>
                  <Button asChild variant="outline">
                    <a href="/admin/projects/new">Add Project</a>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <LogOutIcon />
                  </Button>
                </>
              )}
              {usersCount === 0 && (
                <Button asChild variant="outline">
                  <a href="/register">Registrar</a>
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="flex items-center md:hidden gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t py-4">
            <ul className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    // onClick={() => setIsMenuOpen(false)}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              {isLoggedIn && (
                <li>
                  <button
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
              {usersCount === 0 && (
                <li>
                  <a
                    href="/register"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrar
                  </a>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <a
                    href="/admin/projects/new"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Project
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
