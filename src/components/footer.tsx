import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { socialLinks } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="#" className="text-2xl font-bold text-primary">
              Devfolio
            </Link>
            <p className="mt-2 text-sm text-center md:text-left">
              A modern portfolio for developers.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col items-center md:items-end">
             <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <Button asChild variant="ghost" size="icon">
                <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-secondary-foreground/10 pt-8 text-center text-sm">
          <p>&copy; {year} Devfolio. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
