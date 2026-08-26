import { useHeroStore } from "../entities/hero/model/heroStore";
import { Link } from "react-router-dom";

export function Header() {
    const currentHeroGold = useHeroStore((state) => state.gold);

    return (
        <header>
            <h1>Киберкринж (React Edition)</h1>
            <nav>
                {/*если использовать <a>, то вся суть SPA будет утеряна,
                ибо этот тег заставляет перезагружаться всю страницу.
                вместо этого нужно использовать Link с to, который
                работает по заданным роутам. этот тег добавит соответственный
                путь в адресной строке + перерендерит текущие компоненты на
                необходимые, привязанные к запрошенному пути*/}
                <Link to="/shop">Кузня</Link>
                <Link to="/quests">Квесты</Link>
                <Link to="/profile">Профиль</Link>
                </nav>
            <div id="gold" className="gold-header">
                <span>Золото: {currentHeroGold}</span>
                <img id="img-coins" className="gold-img" src="/images/all/gold-coins.png" alt="монеты" />
            </div>
        </header>
    );
}