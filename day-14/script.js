
//импорты
//-------------------------------------------------------------------
import { getHero, saveHero } from "./hero.js";
import { ITEMS } from "./items.js";

//-------------------------------------------------------------------

//константы
//-------------------------------------------------------------------
const hero = getHero();
//записываю в константу ссылку на месот в DOM
const pageGold = document.querySelector('#gold-count');
//ссылка на все кнопки
const btn = document.querySelectorAll('.btn-trade');

//переменные
//-------------------------------------------------------------------
//для грядущей проверки на процесс анимации
let isAnimating = false;

//вызовы
//-------------------------------------------------------------------
//обновление всего интерфейса
updateAllUI('all');
//вызываю функцию покупки и передаю в неё ссылку на функцию анимации
trade(animatedGold);

//-------------------------------------------------------------------

//функция торговли, в callback записана ссылка на функцию анимации
function trade(callback) {
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
            if (isAnimating) return;

            //записываю ссылку на весь тег DOM, находящийся в одном родителе и стоящим выше текущего
            const priceSpan = target.previousElementSibling;

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

                hero.inventory.push(itemToPush);
                console.log(hero);
                target.dataset.bought = "true";
                target.textContent = "Куплено";

                saveHero(hero);

                updateAllUI('inventory');

                //передаю ссылку на тег, анимацию в CSS и время на анимацию
                triggerAnimation(priceSpan, 'pulse-success', 200);

                //блокируем всё на время анимации
                btn.forEach(b => b.disabled = true);

                //передаём новое значение из объекта
                callback(hero.gold, hero.gold+itemData.price, 500);
            }
            else {
                triggerAnimation(priceSpan, 'shake-text', 300);
            }
        });
    });
}

function animatedGold(targetGold, startGold, duration) {
    //ставим некий флаг, что в процессе анимации
    isAnimating = true;
    //для задания начального времени анимации для возможности повторения цикла в указанном времени
    let startTime = null;

    function step(timestamp) {
        //при вызове функции с помощью requestAnimationFrame в неё всегда
        //будет передаваться текущее значение времени выполнения страницы
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        //вычисляем промежуточное значение
        const currentFrameValue = Math.floor(startGold - progress * (startGold - targetGold));

        //обновление текста
        pageGold.textContent = currentFrameValue;

        //если время не вышло - продолжаем
        if (progress < 1) {
            requestAnimationFrame(step);
        }
        else {
            isAnimating = false;
            btn.forEach(dis => {
                if (dis.dataset.bought !== "true") {
                    dis.disabled = false;
                }
            });
            console.log('Анимация завершена');
        }
    }
    requestAnimationFrame(step);
}

function triggerAnimation(element, className, duration) {
    if (!element) {
        console.log("Передан не элемент", element);   
        return;
    }
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

function updateAllUI(updateType) {
    console.log(updateType);
    const uiUpdates = {
        gold: () => {
            pageGold.textContent = hero.gold;

        },
        inventory: () => {
            const inventory = document.querySelector('#inventory-list');
            const fragment = document.createDocumentFragment();
            if (!inventory) return;
            inventory.innerHTML = '';
            hero.inventory.forEach(item => {
                const li = document.createElement('li');
                li.className = 'inventory-item';

                const img = document.createElement('img');
                img.src = item.img;
                img.alt = item.name;
                img.className = 'inventory-icon';

                const span = document.createElement('span');
                span.textContent = item.name;

                fragment.appendChild(img);
                fragment.appendChild(span);

                inventory.appendChild(fragment);
            });
        },
        buttons: () => {
            btn.forEach(oneBtn => {
                const itemName = ITEMS[oneBtn.dataset.itemId].name;
                if (hero.inventory.some(item => item.name === itemName)) {
                    oneBtn.disabled = true;
                    oneBtn.dataset.bought = 'true';
                    oneBtn.textContent = 'Куплено';
                }
            });
        },
        all: () => {
            uiUpdates.gold();
            uiUpdates.inventory();
            uiUpdates.buttons();
        }
    }

    if (uiUpdates[updateType]) {
        uiUpdates[updateType]();
    }
    else {
        console.log(`Тип обновления ${updateType} не найден`);
    }
}