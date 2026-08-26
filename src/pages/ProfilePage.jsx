import { Inventory } from '../components/Inventory';
import { useState } from 'react';
import { useHeroStore } from '../entities/hero/model/heroStore';
import { useShallow } from 'zustand/shallow';

function ProfilePage() {
    const { name, age, mood, element, extra, info, updateProfile, heroImgSrc, heroImgDesc } = useHeroStore(
        useShallow((state) => ({
            name: state.name,
            age: state.age,
            mood: state.mood,
            element: state.element,
            extra: state.extra,
            info: state.info,
            updateProfile: state.updateProfile,
        }))
    );

    const [ formData, setFormData ] = useState({
        name: name || "",
        age: age || 20,
        mood: mood || "good-neutral",
        element: element || "fire",
        extra: extra || [],
        info: info || ""
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => {
            switch (type) {
                case "checkbox": {
                    return {
                        ...prev,
                        [name]: checked
                            ? [ ...prev[name], value]
                            : prev[name].filter((item) => item !== value)
                    };
                }

                default: {
                    return {
                        ...prev,
                        [name]: value
                    };
                }
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setHero(prev => ({
            ...prev,
            ...formData
        }));
    };

    return (
        <main>
            <section className="character-profile">
                <h2>{name}</h2>
                <span className="badge">Mythic</span>
                <figure>
                <img
                    className="all-images"
                    src={heroImgSrc}
                    alt={heroImgDesc}
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
                <form action="#" method="post" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Личные данные</legend>
                    <label>
                    Имя персонажа:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    </label>
                    <label>
                    Возраст героя:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Выбор пути</legend>
                    <label htmlFor="mood">
                    Мировоззрение:
                    <select name="mood" id="mood" required="" value={formData.mood} onChange={handleChange}>
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
                    <input type="radio" name="element" required="" value="fire" onChange={handleChange} checked={formData.element === "fire"} />
                    </label>
                    <label>
                    Земля
                    <input type="radio" name="element" required="" value="earth" onChange={handleChange} checked={formData.element === "earth"} />
                    </label>
                    <label>
                    Вода
                    <input type="radio" name="element" required="" value="water" onChange={handleChange} checked={formData.element === "water"} />
                    </label>
                    <label>
                    Воздух
                    <input type="radio" name="element" required="" value="air" onChange={handleChange} checked={formData.element === "air"} />
                    </label>
                    <h3>Дополнительные навыки:</h3>
                    <label>
                    Скрытность
                    <input type="checkbox" name="extra" value="stealth" onChange={handleChange} checked={formData.extra.includes("stealth")} />
                    </label>
                    <label>
                    Алхимия
                    <input type="checkbox" name="extra" value="alchemy" onChange={handleChange} checked={formData.extra.includes("alchemy")} />
                    </label>
                    <label>
                    Кузнечное дело
                    <input type="checkbox" name="extra" value="blacksmith" onChange={handleChange} checked={formData.extra.includes("blacksmith")} />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Дополнительно</legend>
                    <label>
                    Примечание для мастера:{" "}
                    <textarea
                        name="info"
                        value={formData.info}
                        rows={3}
                        cols={21}
                        placeholder="Изумительное изречение, если, конечно, необходимо"
                        onChange={handleChange}
                    />
                    </label>
                </fieldset>
                <button type="submit">Принять изменения</button>
                </form>
            </section>
            <section id="inventory-section">
                <Inventory/>
            </section>
        </main>

    );
}

export default ProfilePage;