import React from "react";

function Inventory({ inventoryItems }) {

    const hasItems = inventoryItems && inventoryItems.length > 0;

    return (
        <article>
            <h3>
                {hasItems ? 'Предметы в инвентаре:' :  'Пока что в инвентаре только эхо...'}
            </h3>
            {hasItems && (
                <ul id="inventory-list">
                    {inventoryItems.map((item, i) => (
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