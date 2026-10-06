export interface Item {
    name: string,
    price: number,
    imgSrc: string,
    imgDesc: string,
}

export interface ShopItem extends Item {
    id: string,
}

export type ShopFetch = Record<string, Item>;