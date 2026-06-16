import React from "react";

function Header({ hero }) {
    return (
        <header>
            <h1>Киберкринж (React Edition)</h1>
            <nav><a href="#">Арсенал</a><a href="#">Квесты</a></nav>
            <div id="gold">
                <span>Золото: {hero.gold}</span>
                <img id="img-coins" src="/images/all/gold-coins.png" alt="монеты" />
            </div>
        </header>
    );
}
export default Header;