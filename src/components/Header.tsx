'use client';
import { LogOutIcon, Menu } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
// import ThemeToggle from './ThemeToggle';
import { signOut, useSession } from 'next-auth/react';
import { ModeToggle } from './ModeToggle';

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
    const isHash = href.startsWith('#');
    const targetId = href.replace('#', '');
    const el = isHash ? document.getElementById(targetId) : null;

    // Se for um hash e o elemento existir, prevenimos o comportamento padrão e fazemos scroll suave
    if (isHash && el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }

    // Se for um hash, mas o elemento não existir nesta página, redirecionar para a home com o fragmento
    if (isHash && !el) {
      // Evita recarregar a mesma página sem necessidade
      if (window.location.pathname !== '/') {
        e.preventDefault();
        window.location.assign(`/${href}`);
      }
      setIsMenuOpen(false);
      return;
    }

    // Para links normais (não hash), permitir comportamento padrão e apenas fechar o menu mobile
    setIsMenuOpen(false);
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
              {isLoggedIn && (
                <>
                  {/* <span className="text-sm text-foreground/70">
                    {session?.user?.name || session?.user?.email}
                  </span> */}
                  <a
                    href="/admin/projects/new"
                    className="text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Add Project
                  </a>
                  <a
                    href="/submit-resume"
                    className="text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Submit Resume
                  </a>
                </>
              )}
            </ul>

            {isLoggedIn && (
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOutIcon />
              </Button>
            )}

            {/* <ThemeToggle /> */}
            <ModeToggle />
            <div className="flex items-center gap-2">
              {/* {isLoggedIn && (
                <>
                  <span className="text-sm text-foreground/70">
                    {session?.user?.name || session?.user?.email}
                  </span>
                  <a
                    href="/admin/projects/new"
                    className="text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Add Project
                  </a>
                  <Button
                    variant="ghost"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <LogOutIcon />
                  </Button>
                </>
              )} */}
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
                <>
                  {/* <li>
                    <span className="text-sm text-foreground/70">
                      {session?.user?.name || session?.user?.email}
                    </span>
                  </li> */}
                  <li>
                    <a
                      href="/admin/projects/new"
                      className="block text-foreground/80 hover:text-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add Project
                    </a>
                  </li>
                  <li>
                    <a
                      href="/submit-resume"
                      className="block text-foreground/80 hover:text-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Submit Resume
                    </a>
                  </li>
                </>
              )}
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
              {/* {isLoggedIn && (
                <li>
                  <a
                    href="/admin/projects/new"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Project
                  </a>
                </li>
              )} */}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
