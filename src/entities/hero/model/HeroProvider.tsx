import { createContext, useState, useEffect, useContext, ReactNode, Dispatch, SetStateAction } from "react";
import { getHero, saveHero } from '../lib/hero';

interface Hero {
    name: string;
    gold: number;
    heroImg: string;
    heroImgDescription: string;
    inventory: any[];
    activeQuests: any[];
}

interface HeroContextType {
    hero: Hero;
    setHero: Dispatch<SetStateAction<Hero>>;
    history: Hero[];
    setHistory: Dispatch<SetStateAction<Hero[]>>;
}

export const HeroContext = createContext<HeroContextType | null>(null);

export function HeroProvider({ children }: { children: ReactNode }) {

    //передача без открывающих скобок нужна для ленивой инициализации
    //реакт сам вызовет эту функцию только тогда, когда константа не инициализирована
    const [ hero, setHero ] = useState<Hero>(getHero);

    const [ history, setHistory ] = useState<Hero[]>([]);

    //это для обновления объекта в localstorage при каждом обновлении hero
    useEffect(() => {
        saveHero(hero);
    }, [hero]);

    const value = {
        hero,
        setHero,
        history,
        setHistory
    };

    return (
        <HeroContext.Provider value={value}>
            {children}
        </HeroContext.Provider>
    );
}

export function useHero() {
    const context = useContext(HeroContext);

    if (!context) {
        throw new Error("useHero должен использоваться внутри HeroProvider");
    }

    return context;
}