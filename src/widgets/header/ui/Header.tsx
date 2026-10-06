import { useState, useEffect } from 'react';
import { useHeroStore } from '@/entities/hero';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

export function Header() {
  const currentHeroGold = useHeroStore((state) => state.gold);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-slate-900/95 p-4 text-white shadow-md backdrop-blur-sm">
      <h1 className="text-2xl font-bold text-violet-400">Киберкринж</h1>
      <nav className="hidden items-center gap-6 md:flex">
        <Link to="/shop" className="transition-colors hover:text-violet-400">
          Кузня
        </Link>
        <Link to="/quests" className="transition-colors hover:text-violet-400">
          Квесты
        </Link>
        <Link to="/profile" className="transition-colors hover:text-violet-400">
          Профиль
        </Link>
        <Link to="/test" className="transition-colors hover:text-violet-400">
          Тест
        </Link>
      </nav>
      <div className="flex items-center gap-2 font-bold text-yellow-400">
        <span>Золото: {currentHeroGold}</span>
        <img src="/images/all/gold-coins.png" alt="монеты" className="h-6 w-6" />
      </div>
      <button
        className="relative z-60 flex h-6 w-8 flex-col justify-between md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div
          className={`h-1 w-full rounded bg-white transition-all duration-300 ${isMenuOpen ? 'translate-y-2.5 rotate-45' : ''}`}
        ></div>
        <div
          className={`h-1 w-full rounded bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
        ></div>
        <div
          className={`h-1 w-full rounded bg-white transition-all duration-300 ${isMenuOpen ? '-translate-y-2.5 -rotate-45' : ''}`}
        ></div>
      </button>

      {isMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-slate-900/95 text-3xl text-white backdrop-blur-md md:hidden">
            <Link
              to="/shop"
              onClick={closeMenu}
              className="transition-colors hover:text-violet-400"
            >
              Кузня
            </Link>
            <Link
              to="/quests"
              onClick={closeMenu}
              className="transition-colors hover:text-violet-400"
            >
              Квесты
            </Link>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="transition-colors hover:text-violet-400"
            >
              Профиль
            </Link>
            <Link
              to="/test"
              onClick={closeMenu}
              className="transition-colors hover:text-violet-400"
            >
              Тест
            </Link>
          </div>,
          document.body,
        )}
    </header>
  );
}
