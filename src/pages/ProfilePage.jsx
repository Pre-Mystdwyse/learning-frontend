import React from 'react';
import { useOutletContext } from 'react-router-dom';

function ProfilePage() {
    const { hero, undo, history } = useOutletContext();

    return (
        <main>
            <section id="character-profile">
                <h2>Karbel</h2>
                <span className="badge">Mythic</span>
                <figure>
                <img
                    className="all-images"
                    src="images/main/karbel.png"
                    alt="Karbel в профиль"
                />
                <figcaption>
                    А это типа подпись картинки, хз как будет сотрудничать с alt
                </figcaption>
                </figure>
                <h3>Характеристики</h3>
                <ul>
                <li>
                    Интеллект <strong>15</strong>
                </li>
                <li>
                    Ловкость <strong>15</strong>
                </li>
                <li>
                    Сила <strong>15</strong>
                </li>
                </ul>
            </section>
            <article>
                <p>
                Жил-был Карбел в обычном современном городе. Однажды он, в ничем не
                примечательный день, неспеша прогуливался по улице, почти полностью
                погружённый в свои мысли. Всё вокруг было привычным, <em>обыденным</em>.
                Однако в доселе знакомой улице он переферийно заметил необычное мерцание,
                некое искажение пространства вокруг себя. Это воистину заставило его
                отстраниться от своих дум, дабы воочию убедиться всё ли с ним в порядке и
                что вокруг происходит. Быстро осмотревшись он заметил, что вокруг нет
                никого - улицы пусты. Засим он заметил, как эти искажения вьются каскадно,
                стремятся в какую-то сторону, к какой-то точке. Он решил проследовать за
                этими мнимыми "узорами", отчего через пару десятков шагов смог
                лицезреть... <em>портал</em>... Это слово было первым пришедшим ему на ум
                при виде сего явления. Сомнений не было, особенно при виде того, как
                листва под дуновением ветра влетала в искажённое пространство, легко
                укладываясь на необычного вида... землю..? Карбел осмотрелся и, не долго
                думая, ступил сквозь эту аномалию... Именно так и начинает повествовать
                Карбел каждый раз, когда у него вопрошают о появлении его рогов.
                </p>
            </article>
            <section id="editor">
                <form action="#" method="post">
                <fieldset>
                    <legend>Личные данные</legend>
                    <label>
                    Имя персонажа:{" "}
                    <input
                        type="text"
                        placeholder="Карбел"
                        required=""
                        defaultValue="Карбел"
                    />
                    </label>
                    <label>
                    Возраст героя:{" "}
                    <input
                        type="number"
                        placeholder={18}
                        required=""
                        min={18}
                        max={1000}
                    />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Выбор пути</legend>
                    <label htmlFor="mood">
                    Мировоззрение:
                    <select name="char-mood" id="mood" required="">
                        <optgroup label="Добро: ">
                        <option value="good-good">Законный</option>
                        <option value="good-neutral">Нейтральный</option>
                        <option value="good-chaotic">Хаотичный</option>
                        </optgroup>
                        <optgroup label="Зло: ">
                        <option value="evil-good">Законный</option>
                        <option value="evil-neutral">Нейтральный</option>
                        <option value="evil-chaotic">Хаотичный</option>
                        </optgroup>
                    </select>
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Способности</legend>
                    <h3>Главная стихия:</h3>
                    <label>
                    Огонь
                    <input type="radio" name="element" required="" defaultValue="fire" />
                    </label>
                    <label>
                    Земля
                    <input type="radio" name="element" required="" defaultValue="earth" />
                    </label>
                    <label>
                    Вода
                    <input type="radio" name="element" required="" defaultValue="water" />
                    </label>
                    <label>
                    Воздух
                    <input type="radio" name="element" required="" defaultValue="air" />
                    </label>
                    <h3>Дополнительные навыки:</h3>
                    <label>
                    Скрытность
                    <input type="checkbox" name="extra" defaultValue="stealth" />
                    </label>
                    <label>
                    Алхимия
                    <input type="checkbox" name="extra" defaultValue="alchemy" />
                    </label>
                    <label>
                    Кузнечное дело
                    <input type="checkbox" name="extra" defaultValue="blacksmith" />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Дополнительно</legend>
                    <label>
                    Примечание для мастера:{" "}
                    <textarea
                        name="info"
                        rows={3}
                        cols={21}
                        placeholder="Изумительное изречение, если, конечно, необходимо"
                        defaultValue={""}
                    />
                    </label>
                </fieldset>
                <button type="submit">Принять изменения</button>
                </form>
            </section>
            <section id="inventory-section">
                <h3>Твоё снаряжение</h3>
                <ul id="inventory-list" />
                <button id="cancel-btn">Отмена</button>
            </section>
        </main>

    );
}

export default ProfilePage;