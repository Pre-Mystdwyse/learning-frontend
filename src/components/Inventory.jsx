import React from "react";
import { useEffect } from "react";

function Inventory({ inventoryItems }) {

    const hasItems = inventoryItems && inventoryItems.length > 0;

    useEffect(() => {
        if (hasItems) {
            console.log(`Новый предмет получен! всего предметов: ${inventoryItems.length}`);
        }
    }, [inventoryItems]);

    return (
        <article>
            <h3>
                {hasItems ? 'Предметы в инвентаре:' :  'Пока что в инвентаре только эхо...'}
            </h3>
            {hasItems && (
                <ul id="inventory-list">
                    {inventoryItems.map((item) => (
                        <li key={item.id}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}

export default Inventory;