import alchemyData from './alchemyShopItems.json'
import { AlchemyItem } from './types'

export const fetchAlchemyItems = (): Promise<AlchemyItem[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //я показал, что я доверяю бэкэнду с помощью as
            //я знаю, что это плохо
            //это будет переделано, когда я изучу библиотеку Zod как runtime validator
            resolve(alchemyData as AlchemyItem[]);
        }, 1500);
    });
};