import { Quest, ShopItem } from "../../../entities/hero/model/types";
import { questsData } from "./quests.mock";
import itemsData from "./items.json";
import { ApiError } from "./errors";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

//async всегда возвращает Promise, поэтому при объявлении типа выходящего значения нужно написать и Promise
export const fetchQuestsData = async (excludeIds: string[] = []): Promise<Quest[]> => {
    //excludeIds.some(id => typeof id !== 'string') - это проверка на то, все ли элементы массива - типа строк
    if (!Array.isArray(excludeIds) || excludeIds.some(id => typeof id !== 'string')) {
        throw new ApiError(400, 'Некорректные входные данные: ожидал массив строк excludeIds.');
    }
    //await останавливает выполнение функции до тех пор, пока не выполнится sleep
    await sleep(2000);

    const isServerError = (Math.floor(Math.random() * 100) + 1) < 50;
    if (isServerError) {
        throw new ApiError(500, 'Внутренняя ошибка сервера. Не удалось загрузить квесты.');
    }

    try {
        //поверхностным копированием берём ссылки на объекты и записываем в новую константу
        const allQuests = [...questsData];
        //set работает только с уникальным массивом. он берёт каждый элемент, прогоняет через хэш-функцию,
        //которая превращает строку в уникальный адрес (индекс) в памяти
        //при обращении через .has искомое значение прогоняют через хэш-функцию и переходят по полученной ссылке
        //если там есть элемент - true
        //set может принимать и строки и объекты. в объектах смотрит на ссылки, в строках - делит по буквам
        //если передать в set что-то, где есть повторяющиеся элементы (кроме объектов), то он удалит дубликаты
        const excludeSet = new Set(excludeIds);
        const filteredQuests = allQuests.filter(quest => !excludeSet.has(quest.id));

        const shuffeledQuests = [...filteredQuests];
        for (let i = shuffeledQuests.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffeledQuests[i], shuffeledQuests[j]] = [shuffeledQuests[j], shuffeledQuests[i]];
        }
        //.slice хорош тем, что если в массиве осталось меньше 3 элементов, то он не выдаст ошибку, а просто выведет все оставшиеся
        return shuffeledQuests.slice(0, 3);
    }
    catch (error) {
        throw new ApiError(500, 'Произошла непредвиденная ошибка при обработке данных квестов.');
    }
};