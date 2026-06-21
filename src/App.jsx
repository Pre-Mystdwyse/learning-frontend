import React, { useState, useEffect, use } from "react";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import { ITEMS } from "./js/items";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {

    //автосохранение при любом изменении hero
    // useEffect(() => {
    //     saveHero(hero);
    // }, [hero]);


    return (
        
        <div className="app">
            <Header />
            <main>
                {/*Outlet нужен для того, чтобы сюда подставлялся необоходимый код
                в зависимости отпути. это позволяет избежать перерендера того же
                хедера и прочего на каждой странице, ведь суть реакта в одностраничности */}
                <Outlet />
            </main>
        </div>
    );
}

export default App;