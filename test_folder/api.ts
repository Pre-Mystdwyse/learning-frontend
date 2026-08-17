import alchemyData from './alchemyShopItems.json'
import { AlchemyItem } from './types'

export const fetchAlchemyItems = (): Promise<AlchemyItem[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(alchemyData);
        }, 1500);
    });
};