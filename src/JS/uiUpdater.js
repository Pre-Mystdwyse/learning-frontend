
import { ITEMS } from "./items.js";
import { getHero, saveHero } from "./hero.js";
import { btn, pageGold, inventory, itemsPrices } from "./constants.js";

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
            const fragment = document.createDocumentFragment();
            // добавление текста в название таблицы при отсутствии элементов в инвентаре
            const tableName = inventory.previousElementSibling;
            if (hero.inventory.length !== 0) tableName.textContent = 'Твоё снаряжение';
            else tableName.textContent = 'Пока что тут только эхо...';
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