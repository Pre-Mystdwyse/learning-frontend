import { useHeroStore } from "../../../entities/hero/model/heroStore";

export function useTrade() {
    const hero = useHeroStore((state) => state.hero);
    const setHero = useHeroStore((state) => state.setHero);
    const setHistory = useHeroStore((state) => state.setHistory);

    const buyItem = (itemData) => {
        if (hero.gold >= itemData.price) {
            //заносим данные в историю
            setHistory((prev) => [ ...prev, structuredClone(hero)]);
            console.log('данные героя занесены в историю перед покупкой');

            //создаём уникальный предмет
            const newItem = {
                ...itemData,
                id: crypto.randomUUID()
            };

            //zustand сам вызовет saveHero внутри себя
            setHero((prev) => ({
                ...prev,
                gold: prev.gold - itemData.price,
                inventory: [ ...prev.inventory, newItem ]
            }));
        } else {
            alert('НУЖНО БОЛЬШЕ ЗОЛОТА');
        }
    };

    return { buyItem };
}