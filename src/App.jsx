import React, { useState, useEffect } from "react";
import { getHero, saveHero } from './JS/hero';
import Header from "./components/Header";
import ShopItem from "./components/ShopItem";
import Inventory from "./components/Inventory";
import { ITEMS } from "./js/items";

function App() {
    //инициализация состояния данными из hero.js
    const [hero, setHero]= useState(getHero());

    //автосохранение при любом изменении hero
    useEffect(() => {
        saveHero(hero);
    }, [hero]);

    //упрощённая функия покупки
    const buyItem = (itemData) => {
        if (hero.gold >= itemData.price) {
            const newItem = {
                ...itemData,
                id: Date.now()
            };

            setHero({
                ...hero,
                gold: hero.gold - itemData.price,
                inventory: [ ...hero.inventory, newItem ]
            });
        } else {
            alert('Нужно больше золота!');
        }
    };

    return (
        <div className="app">
            <Header hero={hero} />
            <main>
                <section id="rare-shop">
                    {Object.entries(ITEMS).map(([key, itemData]) => (
                        <ShopItem
                        key={key} //ID для React
                        item={itemData}
                        onBuy={() => buyItem(itemData)}
                        />
                    ))}
                </section>
                <section id="inventory-section">
                    <Inventory inventoryItems={hero.inventory} />
                </section>
            </main>
        </div>
    );
}

export default App;