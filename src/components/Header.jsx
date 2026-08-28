import { useHeroStore } from "../entities/hero/model/heroStore";
import { Link } from "react-router-dom";

export function Header() {
    const currentHeroGold = useHeroStore((state) => state.gold);

    return (
        <header
        className="bg-purple-900 text-slate-100 flex items-center justify-between flex-col">
            <h1 className="">Киберкринж (React Edition)</h1>
            <nav className="flex gap-4">
                {/*если использовать <a>, то вся суть SPA будет утеряна,
                ибо этот тег заставляет перезагружаться всю страницу.
                вместо этого нужно использовать Link с to, который
                работает по заданным роутам. этот тег добавит соответственный
                путь в адресной строке + перерендерит текущие компоненты на
                необходимые, привязанные к запрошенному пути*/}
                <Link to="/shop">Кузня</Link>
                <Link to="/quests">Квесты</Link>
                <Link to="/profile">Профиль</Link>
                <Link to="/test">Тест</Link>
                </nav>
            <div className="flex gap-2">
                <span>Золото: {currentHeroGold}</span>
                <img src="/images/all/gold-coins.png" alt="монеты"
                className="w-12"/>
            </div>
        </header>
    );
}