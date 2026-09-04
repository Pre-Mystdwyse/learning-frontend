import { useState, useEffect } from "react";
import { useHeroStore } from "../entities/hero/model/heroStore";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

export function Header() {
    const currentHeroGold = useHeroStore((state) => state.gold);

    const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-sm text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold text-violet-400">Киберкринж</h1>
            <nav className="hidden md:flex gap-6 items-center">
                <Link to="/shop" className="hover:text-violet-400 transition-colors">Кузня</Link>
                <Link to="/quests" className="hover:text-violet-400 transition-colors">Квесты</Link>
                <Link to="/profile" className="hover:text-violet-400 transition-colors">Профиль</Link>
                <Link to="/test" className="hover:text-violet-400 transition-colors">Тест</Link>
            </nav>
            <div className="flex items-center gap-2 font-bold text-yellow-400">
                <span>Золото: {currentHeroGold}</span>
                <img src="/images/all/gold-coins.png" alt="монеты" className="w-6 h-6"/>
            </div>
            <button
                className="md:hidden flex flex-col justify-between w-8 h-6 relative z-60"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <div className={`h-1 w-full bg-white rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
                <div className={`h-1 w-full bg-white rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`h-1 w-full bg-white rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
            </button>

            {isMenuOpen && createPortal(
                <div className="text-white fixed inset-0 bg-slate-900/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 text-3xl md:hidden">
                    <Link to="/shop" onClick={closeMenu} className="hover:text-violet-400 transition-colors">Кузня</Link>
                    <Link to="/quests" onClick={closeMenu} className="hover:text-violet-400 transition-colors">Квесты</Link>
                    <Link to="/profile" onClick={closeMenu} className="hover:text-violet-400 transition-colors">Профиль</Link>
                    <Link to="/test" onClick={closeMenu} className="hover:text-violet-400 transition-colors">Тест</Link>
                </div>,
                document.body
            )}
        </header>
    );
}