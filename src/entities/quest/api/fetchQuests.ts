import { ApiError } from "@/shared/api";
import { questsData } from "./quests.mock";
import { Quest } from "../model/types";
import { sleep } from "@/shared/lib";

//async всегда возвращает Promise, поэтому при объявлении типа выходящего значения нужно написать и Promise
export const fetchQuestsData = async (excludeIds: string[] = []): Promise<Quest[]> => {
    //excludeIds.some(id => typeof id !== 'string') - это проверка на то, все ли элементы массива - типа строк
    if (!Array.isArray(excludeIds) || excludeIds.some(id => typeof id !== 'string')) {
        throw new ApiError(400, 'Некорректные входные данные: ожидал массив строк excludeIds.');
    }
    //await останавливает выполнение функции до тех пор, пока не выполнится sleep
    await sleep(2000);

    const isServerError = (Math.floor(Math.random() * 100) + 1) < 25;
    if (isServerError) {
        throw new ApiError(500, 'Внутренняя ошибка сервера. Не удалось загрузить квесты.');
    }

    try {
        //set работает только с уникальным массивом. он берёт каждый элемент, прогоняет через хэш-функцию,
        //которая превращает строку в уникальный адрес (индекс) в памяти
        //при обращении через .has искомое значение прогоняют через хэш-функцию и переходят по полученной ссылке
        //если там есть элемент - true
        //set может принимать и строки и объекты. в объектах смотрит на ссылки, в строках - делит по буквам
        //если передать в set что-то, где есть повторяющиеся элементы (кроме объектов), то он удалит дубликаты
        const excludeSet = new Set(excludeIds);
        const filteredQuests = questsData.filter(quest => !excludeSet.has(quest.id));

        for (let i = filteredQuests.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredQuests[i], filteredQuests[j]] = [filteredQuests[j], filteredQuests[i]];
        }
        //.slice хорош тем, что если в массиве осталось меньше 3 элементов, то он не выдаст ошибку, а просто выведет все оставшиеся
        return filteredQuests.slice(0, 3);
    }
    catch (error) {
        if (error instanceof ApiError) throw error;
        console.error("Критический баг в fetchQuestData: ", error);
        throw new ApiError(500, "Внутренняя ошибка приложения");
    }
};