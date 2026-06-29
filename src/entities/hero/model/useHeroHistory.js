import { useHero } from "./HeroProvider";

export function useHeroHistory() {
    const { setHero, history, setHistory } = useHero();

    const undo = () => {
        if (history.length === 0) return;

        //достаём последнее сохранённое состояние
        const lastHeroState = history[history.length - 1];

        //применяем старое состояние героя
        setHero(lastHeroState);

        //удаляем этот шаг из истории в стейте
        setHistory((prev) => prev.slice(0, -1));

        console.log('действие отменено, текущая история: ', history)
    };

    return {
        undo,
        hasHistory: history.length > 0
    };
}