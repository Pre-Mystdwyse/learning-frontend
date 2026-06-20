import React from "react";
import { useOutletContext } from 'react-router-dom';

function QuestPage() {
    return (
        <main>
            <h2 id="avialable-quests">Доступные квесты</h2>
            <section id="card-art">
                <article id="q-hunt" className="quest-card">
                <h3>Уничтожение зверя</h3>
                <strong className="target">Разъярённая Урса</strong>
                <strong className="reward">Награда:</strong>
                <div className="img-box">
                    <img
                    className="item-img"
                    src="images/quests/rewards/AK47.png"
                    alt="Несокрушимое оружие"
                    />
                </div>
                <input type="checkbox" className="modal-logic" id="modal-l1" />
                <label htmlFor="modal-l1" className="open-button">
                    Подробнее
                </label>
                <div className="modal-overlay">
                    <label htmlFor="modal-l1" className="modal-background" />
                    <div className="modal-content">
                    <h3>Выследить и убить</h3>
                    <p>
                        На окраине деревни Оукридж есть лес с небольшими скалами внутри. в
                        одной из них есть пещера, по виду которой сразу будет ясно, что она
                        занята опасным хищником. Конкретно этот зверь - Урса. Не смотря на
                        то, что она появилась в этом лесу не так давно, но уже начала весомо
                        терроризировать местных обитателей... по крайней мере тех, кто смог
                        сбежать. Будь уверен, что этот зверь не желает знать значения слова
                        "компромисс".
                    </p>
                    </div>
                </div>
                <button className="accept-button">Приступить</button>
                </article>
                <article id="q-find" className="quest-card">
                <h3>Поиск порталов</h3>
                <strong className="target">Очевидно порталы</strong>
                <strong className="reward">Награда:</strong>
                <div className="img-box">
                    <img
                    className="item-img"
                    src="images/quests/rewards/ArgonCrystal.png"
                    alt="Чистый аргон, замороженный магией"
                    />
                    <img
                    className="item-img"
                    src="images/quests/rewards/blender.png"
                    alt="СОЗДАЙ СВОЙ 3D МИР!"
                    />
                </div>
                <input type="checkbox" className="modal-logic" id="modal-l2" />
                <label htmlFor="modal-l2" className="open-button">
                    Подробнее
                </label>
                <div className="modal-overlay">
                    <label htmlFor="modal-l2" className="modal-background" />
                    <div className="modal-content">
                    <h3>Три-девятое не за горами</h3>
                    <p>
                        В этом мире порталы - это обыденность, но почти столь же и редкость.
                        Большинство из таковых соединяют два места этого мира, но есть и
                        иные, соединяющие этот мир с другими. Как раз-таки они и являются
                        наиболее важными, ибо могут быть как просто завораживающим местом,
                        так и представлять опасность, в основном, из-за обитателей мест на
                        другом входе. Однако эти порталы не появляются спонтанно, если быть
                        достаточно внимательным к потоку магии.
                    </p>
                    </div>
                </div>
                <button className="accept-button">Приступить</button>
                </article>
                <article id="q-research" className="quest-card">
                <h3>Изучение аномалий</h3>
                <strong className="target">Концентрация эфира</strong>
                <strong className="reward">Награда:</strong>
                <div className="img-box">
                    <img
                    className="item-img"
                    src="images/quests/rewards/ion_cube.png"
                    alt="Магическая энергия, которую проще использовать для технологий"
                    />
                    <img
                    className="item-img"
                    src="images/quests/rewards/Kuva.png"
                    alt="Некогда часть Человека-в-стене... Он до сих пор недоволен"
                    />
                    <img
                    className="item-img"
                    src="images/quests/rewards/kyanite.png"
                    alt="Резонирующий кристалл"
                    />
                </div>
                <input type="checkbox" className="modal-logic" id="modal-l3" />
                <label htmlFor="modal-l3" className="open-button">
                    Подробнее
                </label>
                <div className="modal-overlay">
                    <label htmlFor="modal-l3" className="modal-background" />
                    <div className="modal-content">
                    <h3>В эфире</h3>
                    <p>
                        Как известно, в этом мире есть магия, а значит есть и мана,
                        необходимая для сотворения заклинаний, является неким неиссякаемым
                        источником энергии, ветающем вокруг. Однако не так давно было
                        обнаружено, что существует ещё более мощный источник энергии - эфир.
                        Хоть он и так же неисчерпаем, теоретически, но им не пропитано всё
                        пространство. В основном, он проявляется спонтанно в случайных
                        местах, концентрируясь в одном месте. На данный момент всё ещё не
                        известно зачем и почему происходят такие скопления эфира, ибо через
                        некоторое время, когда концентрация эфира достигает около 42%
                        относительно маны, эфирный "пузырь" лопается, разлетаясь на
                        внушительное расстояние, отчего все маги в области чувствуют
                        присутствие эфира. Нужно изучить эти проявления и, как минимум,
                        выдвинуть весомое предположение почему происходят такие скопления
                        эфира.
                    </p>
                    </div>
                </div>
                <button className="accept-button">Приступить</button>
                </article>
                <article id="q-help" className="quest-card">
                <h3>Помощь магией</h3>
                <strong className="target">Укрепление вооружения</strong>
                <strong className="reward">Награда:</strong>
                <div className="img-box">
                    <img
                    className="item-img"
                    src="images/quests/rewards/magnetite.png"
                    alt="Магнит + магия"
                    />
                    <img
                    className="item-img"
                    src="images/quests/rewards/riven_crystal.png"
                    alt="Осколок энерго-кристалла из мира за порталом"
                    />
                    <img
                    className="item-img"
                    src="images/quests/rewards/sentient_bow.png"
                    alt="Лук владеющих разумом. Иная магия, иная технология"
                    />
                    <img
                    className="item-img"
                    src="images/quests/rewards/venka.png"
                    alt="Напоминают о способности Фенрира"
                    />
                </div>
                <input type="checkbox" className="modal-logic" id="modal-l4" />
                <label htmlFor="modal-l4" className="open-button">
                    Подробнее
                </label>
                <div className="modal-overlay">
                    <label htmlFor="modal-l4" className="modal-background" />
                    <div className="modal-content">
                    <h3>Железо мы куём</h3>
                    <p>
                        Вооружение из обычных материалов, как например, сталь - армейский
                        стандарт. Но, как говорится: "нет предела совершенству", отчего
                        давно практикуется зачарование снаряжения магией. На сей же раз было
                        придумано новое вооружение, отчего требуется проявить креативность и
                        в магической части - подобрать оптимальные зачарования.
                    </p>
                    </div>
                </div>
                <button className="accept-button">Приступить</button>
                </article>
            </section>
            <section id="inventory-section">
                <h3>Твоё снаряжение</h3>
                <ul id="inventory-list" />
                <button id="cancel-btn">Отмена</button>
            </section>
            <footer>
                <p>
                Игра на стадии идеи. Вполне возможно, что вовсе не выйдет, но кто знает...
                </p>
                <a
                className="git"
                href="https://github.com/Pre-Mystdwyse/learning-frontend"
                >
                <p>Угадай, куда ведёт эта ссылка?</p>
                </a>
            </footer>
        </main>

    )
}

export default QuestPage;