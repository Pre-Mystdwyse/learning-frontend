import React from "react";
import { ITEMS } from "../JS/items";
import ShopItem from "./ShopItem";

function RareShop() {
    return (
        <section id="rare-shop">
            {Object.entries(ITEMS).map(([key, itemData]) => (
                <ShopItem
                key={key}
                item={itemData}
                onBuy={() => handleBuy}
                />
            ))}
        </section>
    )
}

export default RareShop;