import { useEffect, useRef, useMemo } from "react";

function Inventory({ inventoryItems }) {

    const hasItems = inventoryItems && inventoryItems.length > 0;
    const listRef = useRef(null);
    const totalValue = useMemo(() => {
        return inventoryItems?.reduce((sum, item) => sum + item.price, 0);
    }, [inventoryItems]);

    useEffect(() => {
        if (hasItems) {

            listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            console.log(`Новый предмет получен! всего предметов: ${inventoryItems.length}`);
        }
    }, [inventoryItems]);

    return (
        <article>
            <h3>
                {hasItems ? 'Предметы в инвентаре:' :  'Пока что в инвентаре только эхо...'}
            </h3>
            {hasItems && (
                <ul id="inventory-list" ref={listRef}>
                    {inventoryItems.map((item) => (
                        <li key={item.id}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
            <p>Общая стоимость {totalValue} золота</p>
        </article>
    );
}

export default Inventory;