import React from "react";
import { useOutletContext } from 'react-router-dom';
import { ITEMS } from '../JS/items'
import RareShop from "../components/RareShop";

function ShopPage() {

    // const handleBuy = 

    return (
        <main>
            <section>
                <h2>Имеющееся вооружение</h2>
                <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Тип</th>
                        <th>Мощь</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ясеневый жезл</td>
                        <td>Магия</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>Двуручный меч</td>
                        <td>Ближний бой</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>Охотничий лук</td>
                        <td>Дальний бой</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Щит</td>
                        <td>Ближний бой</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Парные кинжалы</td>
                        <td>Ближний бой</td>
                        <td>4*2</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </section>
            <RareShop />
            <section id="forge">
                <h2>Добавить предмет в кузницу</h2>
                <form action="#" method="post">
                <label htmlFor="weapon-name">Название оружия: </label>
                <input type="text" id="weapon-name" required="" />
                <label htmlFor="weapon-rare">Редкость оружия:</label>
                <select name="rare" id="weapon-rare" required="">
                    <option value="common">Обычный</option>
                    <option value="rare">Редкий</option>
                    <option value="mythic">Мифический</option>
                </select>
                <button type="submit">Выковать</button>
                </form>
            </section>
            <section id="inventory-section">
                <h3 />
                <ul id="inventory-list" />
                <button id="cancel-btn">Отмена</button>
            </section>
        </main>
    )
}

export default ShopPage;