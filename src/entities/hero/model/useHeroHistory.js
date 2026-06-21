import { useHeroStore } from "./heroStore";

export function useHeroHistory() {
    const history = useHeroStore((state) => state.history);
    const setHero = useHeroStore((state) => state.setHero);
    const setHistory = useHeroStore((state) => state.setHistory);

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