import React, { useState, useEffect, use } from "react";
import { getHero, saveHero } from './JS/hero';
import Header from "./components/Header";
import ShopItem from "./components/ShopItem";
import Inventory from "./components/Inventory";
import { ITEMS } from "./js/items";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {
    //инициализация состояния данными из hero.js
    const [hero, setHero]= useState(() => getHero());

    const [ history, setHistory ] = useState([]);

    //автосохранение при любом изменении hero
    useEffect(() => {
        saveHero(hero);
    }, [hero]);

    function undo() {
        /*
        когда делаешь стрелочную функцию в функции переменной (которая с приставкой set),
        то React выдаст в переменную наиактуальнейшее значение этой переменной;
        ------------
        если обращаться к переменной без приставки set, то может быть использовано
        неактуальное значение, т.к. эта переменная обновляется только после
        выполнения всех функций, в которых используется функция этой переменной (с set).
        */
        setHistory(prevHistory => {
            //проверка на пустой массив
            if (prevHistory.length === 0) return prevHistory;
            //в квадратных скобках пишется индекс элемента массива, в данном случае последнего, ибо длина - 1 = последний элемент
            const lastHeroState = prevHistory[prevHistory.length - 1];

            setHero(lastHeroState);
            /*
            первое значение - отсчёт индексов элементов от первого - в данном случае означает, что берём массив с 1-го элемента;
            второе значение - отсчёт количества элементов массива, т.е. если написать -1 - значит берём всё от начала ДО последнего.
            */
            return prevHistory.slice(0, -1);
        });
    }

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
                <Outlet context={{ hero, buyItem, setHero, history, undo }} />
            </main>
        </div>
    );
}

export default App;