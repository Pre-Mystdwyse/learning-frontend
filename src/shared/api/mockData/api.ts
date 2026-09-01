import { Quest, ShopItem } from "../../../entities/hero/model/types";
import questsData from "./quests.json";
import itemsData from "./items.json";

export const fetchQuestsData = (): Promise<Quest[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { 
            const tryingToConnect = Math.floor(Math.random() * 100) + 1;

            if (tryingToConnect >= 25) {
                const formattedQuests: Quest[] = questsData.map((item) => ({
                    ...item,
                    description: item.description.join(' '),
                    difficulty: item.difficulty as Quest['difficulty'],
                }));

                resolve(formattedQuests);
            }
            else {
                reject(new Error("Ошибка подключения к серверу"));
            }
        }, 2000)
    })
}

export const fetchItemsData = (): Promise<ShopItem[]> => {
    return new Promise((resolve, reject) => {
        const tryingToConnect = Math.floor(Math.random() * 100) + 1;

        setTimeout(() => {
            if (tryingToConnect >= 25) {
                //есть прикол в методе .map
                //если передавать обычным образом (id, item)
                //то он будет думать, что первое - это сам элемент
                //а второе - его порядковый номер в массиве
                //и будет записывать в id элемент, а в item его порядковый номер
                //чтобы исправить это, нужно лишь заключить вводные данные в []
                //это называется деструктуризацией элемента
                //теперь он берёт basilisk: {...} и разделяет так
                // название (id) помещает в id, а всё, чему это название было равно
                //помещает в item
                const formattedItems = Object.entries(itemsData).map(([id, item]) => {
                    const { img, description, ...rest } = item;

                    return {
                        id,
                        imgSrc: img,
                        imgDesc: description,
                        ...rest,
                    }
                });
                resolve(formattedItems);
            }
            else {
                reject(new Error("Ошибка подключения к серверу"));
            }
        }, 2000)
    })
}