import { useContext } from "react";
import { HeroContext } from "../entities/hero/model/HeroProvider";

function Header() {
    const { hero } = useContext(HeroContext);

    return (
        <header>
            <h1>Киберкринж (React Edition)</h1>
            <nav>
                <a href="shop">Арсенал</a>
                <a href="quests">Квесты</a>
                <a href="#">Об игре</a>
                </nav>
            <div id="gold" className="gold-header">
                <span>Золото: {hero.gold}</span>
                <img id="img-coins" className="gold-img" src="/images/all/gold-coins.png" alt="монеты" />
            </div>
        </header>
    );
}
export default Header;