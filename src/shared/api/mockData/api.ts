import { Quest } from "../../../entities/hero/model/types";
import itemsData from "./quests.json";

export const fetchItemsData = (): Promise<Quest[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const tryingToConnect = Math.floor(Math.random() * 100) + 1;
            
            if (tryingToConnect <= 25) {
                const formattedQuests: Quest[] = itemsData.map((item) => ({
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