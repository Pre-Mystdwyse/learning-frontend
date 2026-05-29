
//импорты
//-------------------------------------------------------------------
import { getHero, saveHero } from "./hero.js";
import { ITEMS } from "./items.js";
import {  } from "./itemRemover.js";

//-------------------------------------------------------------------

//константы
//-------------------------------------------------------------------
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

export function animatedGold(targetGold, startGold, duration) {
    //ставим некий флаг, что в процессе анимации
    isAnimating = true;
    //для задания начального времени анимации для возможности повторения цикла в указанном времени
    let startTime = null;

    btn.forEach(b => b.disabled = true);

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
            updateAllUI('buttons');
            console.log('Анимация завершена');
        }
    }
    requestAnimationFrame(step);
}


//функция добавление анимации css
function triggerAnimation(element, className, duration) {
    if (!element) {
        console.log("Передан не элемент", element);   
        return;
    }
    element.classList.add(className);
    if (duration > 0) {
        setTimeout(() => {
            element.classList.remove(className);
        }, duration);
    }
}

export function updateAllUI(updateType) {
    const hero = getHero();
    //забираю тип необходимого обновления
    console.log(`Тип обновления: ${updateType}`);

    //список типов обновлений и сами обновления внутри
    const uiUpdates = {
        gold: () => {
            pageGold.textContent = hero.gold;

        },
        inventory: () => {
            const inventory = document.querySelector('#inventory-list');
            const fragment = document.createDocumentFragment();
            // добавление текста в название таблицы при отсутствии элементов в инвентаре
            const tableName = inventory.previousElementSibling;
            if (hero.inventory.length === 0) tableName.textContent += ', но пока что тут только эхо...';
            else tableName.textContent = 'Твоё снаряжение';
            if (!inventory) return;
            inventory.innerHTML = '';
            hero.inventory.forEach(item => {
                //создаю тег li
                const li = document.createElement('li');
                //добавляю этому тегу класс
                li.className = 'inventory-item';
                // добавляю id к тегу, по которому буду находить элемент в инвентаре
                li.dataset.id = item.id;
                // создаю тег img
                const img = document.createElement('img');
                // добавляю путь к картинке из инвентаря
                img.src = item.img;
                // добавляю описание картинки из инвентаря
                img.alt = item.name;
                // добавляю класс тегу img
                img.className = 'inventory-icon item-img';
                // создаю тег span
                const span = document.createElement('span');
                // записываю в span название предмета из инвентаря
                span.textContent = item.name;
                // добавляем теги img и span в тег li
                li.appendChild(img);
                li.appendChild(span);
                // добавляем тег li в коробку, чтобы потом всё разом встроить
                fragment.appendChild(li);
            });
            // встраиваем всё сразу из коробки во избежания множества пересборок DOM
            inventory.appendChild(fragment);
        },
        buttons: () => {
            btn.forEach(oneBtn => {
                const itemName = ITEMS[oneBtn.dataset.itemId].name;
                if (hero.inventory.some(item => item.name === itemName)) {
                    oneBtn.disabled = true;
                    oneBtn.dataset.bought = 'true';
                    oneBtn.textContent = 'Куплено';
                }
                else {
                    oneBtn.disabled = false;
                    oneBtn.dataset.bought = 'false';
                    oneBtn.textContent = 'Купить';
                }
            });
        },
        prices: () => {
            const itemsPrices = document.querySelectorAll('.price');
            itemsPrices.forEach(element => {
                const nextElement = element.nextElementSibling;
                const targetName = nextElement.dataset.itemId;
                const currentItem = ITEMS[targetName];

                if (currentItem) {
                    element.textContent = `${currentItem.price} золота`;
                    console.log(`успешное обновление из мнимой бд данных по ${currentItem.name}`);
                }
                else {
                    console.log(`предмет с id ${targetName} не найден во мнимой бд`);
                }
            });
        },
        all: () => {
            uiUpdates.gold();
            uiUpdates.prices();
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