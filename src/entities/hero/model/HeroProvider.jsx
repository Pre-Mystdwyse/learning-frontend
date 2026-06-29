import { createContext, useState, useEffect, useContext } from "react";
import { getHero, saveHero } from '../lib/hero';

export const HeroContext = createContext(null);

export function HeroProvider({ children }) {

    //передача без открывающих скобок нужна для ленивой инициализации
    //реакт сам вызовет эту функцию только тогда, когда константа не инициализирована
    const [ hero, setHero ] = useState(getHero);

    const [ history, setHistory ] = useState([]);

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