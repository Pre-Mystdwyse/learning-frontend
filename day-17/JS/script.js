
import { updateAllUI } from "./uiUpdater.js";
import { start, trade } from "./trade.js";
import { } from "./itemRemover.js";
import { ITEMS } from "./items.js";

async function loadExternalPrices() {
    try {
        const response = await fetch('./JSON/prices.json');
    
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        for (let key in data) {
            //пребираю каждый элемент в data, записывая название текущего
            //элемента в key
            if (ITEMS[key]) {
                ITEMS[key].price = data[key];
            }
        }
    }
    catch (error) {
        console.log("Ошибка запроса: ", error);
    }
}

async function initializeApp() {

    try {
        await loadExternalPrices();
    
        updateAllUI('all');
        start(trade);
    
        console.log('приложение успешно запущено с актуальными ценами');
    }
    catch (error) {
        console.error('Ошибка при запуске:', error);
        console.log('внесение локальных данных');
        updateAllUI('all');
    }
}

initializeApp();