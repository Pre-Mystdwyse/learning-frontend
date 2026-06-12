
import { animatedGold, triggerAnimation } from "./animations.js";
import{ ITEMS } from "./items.js";
import { getHero, getHeroHistory, saveHero, setHeroHistory } from "./hero.js";
import { updateAllUI } from "./uiUpdater.js";
import { btn, isAnimating } from "./constants.js";

export function start(callback) {
    callback(animatedGold);
}
export function trade(callback) {

    //перебираю каждую кнопку
    btn.forEach(oneBtn => {
        oneBtn.addEventListener('click', (event) => {
            //в target записываю ссылку для сокращения и возможных потерь
            const target = event.target;

            const itemId = target.dataset.itemId; //берём название предмета
            const itemData = ITEMS[itemId]; //получаем все данные о предмете по названию

            //проверка-оптимицация: если товар уже куплен, то не будем даже тратить ресурсы на иную проверку
            if (target.dataset.bought === "true") return;
            //если в процессе анимации - завершаю

            if (isAnimating !== false) return;

            //записываю ссылку на весь тег DOM, находящийся в одном родителе и стоящим выше текущего
            const priceSpan = target.previousElementSibling;

            const hero = getHero();

            //работаем напрямую с объектами персонажа
            if (hero.gold >= itemData.price) {
                hero.gold -= itemData.price;

                const itemToPush = {
                    name: itemData.name,
                    price: itemData.price,
                    img: itemData.img,
                    description: itemData.description,
                    id: Date.now()
                };

                setHeroHistory();

                hero.inventory.push(itemToPush);
                console.log(hero);
                target.dataset.bought = "true";
                target.textContent = "Куплено";

                saveHero(hero);

                updateAllUI('inventory');

                //передаю ссылку на тег, анимацию в CSS и время на анимацию
                triggerAnimation(priceSpan, 'pulse-success', 200);

                //передаём новое значение из объекта
                callback(hero.gold, hero.gold+itemData.price, 500);
            }
            else {
                triggerAnimation(priceSpan, 'shake-text', 300);
            }
        });
    });
}