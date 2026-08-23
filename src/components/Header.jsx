import { useHeroStore } from "../entities/hero/model/heroStore";

function Header() {
    const currentHeroGold = useHeroStore((state) => state.gold);

    return (
        <header>
            <h1>Киберкринж (React Edition)</h1>
            <nav>
                <a href="shop">Арсенал</a>
                <a href="quests">Квесты</a>
                <a href="#">Об игре</a>
                </nav>
            <div id="gold" className="gold-header">
                <span>Золото: {currentHeroGold}</span>
                <img id="img-coins" className="gold-img" src="/images/all/gold-coins.png" alt="монеты" />
            </div>
        </header>
    );
}
export default Header;