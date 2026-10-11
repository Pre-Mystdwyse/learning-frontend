import { useState } from 'react';
import { useHeroStore } from '@/entities/hero';
import { Link } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { BurgerButton } from './BurgerButton';
import { NAV_LINKS } from '../model/nav.config';

export function Header() {
  const currentHeroGold = useHeroStore((state) => state.gold);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-slate-900/95 p-4 text-white shadow-md backdrop-blur-sm">
      <h1 className="text-2xl font-bold text-violet-400">Киберкринж</h1>
      <nav className="hidden items-center gap-6 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            className='transition-colors hover:text-violet-400'
          >
          {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2 font-bold text-yellow-400">
        <span>Золото: {currentHeroGold}</span>
        <img src="/images/all/gold-coins.png" alt="монеты" className="h-6 w-6" />
      </div>
      
      <BurgerButton
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </header>
  );
}
