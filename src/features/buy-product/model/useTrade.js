import { useHero } from "../../../entities/hero/model/HeroProvider";

export function useTrade() {
    const { hero, setHero, setHistory } = useHero();

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