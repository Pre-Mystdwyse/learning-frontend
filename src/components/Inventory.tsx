import { useMemo, useRef, useEffect } from "react";
import { useHeroStore } from "../entities/hero/model/heroStore";

export function Inventory() {
    const currentHeroInventory = useHeroStore((state) => state.inventory);
    const sellItem = useHeroStore((state) => state.sellItem);

    const hasItems = currentHeroInventory && currentHeroInventory.length > 0;
    const listRef = useRef<HTMLUListElement>(null);

    const totalCost = useMemo(() => {
        return currentHeroInventory?.reduce((sum, item) => sum + item.price, 0);
    }, [currentHeroInventory]);

    useEffect(() => {
        if (hasItems) {
            listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [currentHeroInventory]);

    return (
        <article className="hero-inventory">
            <h3>
                {hasItems ? "Предметы в инвентаре:" : "Пока что в инвентаре только эхо..."}
            </h3>
            {hasItems && (
                <ul ref={listRef}>
                    {currentHeroInventory.map((item) => (
                        <li key={item.id}>
                            <img src={item.imgSrc} alt={item.imgDesc} />
                            <h3>{item.name}</h3>
                            <p>{item.price / 2}</p>
                            <button onClick={() => sellItem(item.id)}>Продать</button>
                        </li>
                    ))}
                </ul>
            )}
            <p>Общая стоимость инвентаря: {totalCost} золота</p>
            <p>Общее количество предметов в инвентаре: {currentHeroInventory.length}</p>
        </article>
    )
}