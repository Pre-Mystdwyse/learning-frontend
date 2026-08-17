

export interface HeroStats {
    hp: number,
    gold: number,
    takeDamage: (amount: number) => void,
    healFull: () => void,
    spendGold: (amount: number) => {
        ifNotEnoughGold: number | null;
    },
    healABit: (
        amount: number | null,
        percent: number | null,
    ) => {
        nonEffective: number | null;
        nullPotions: boolean;
    }
}

export interface AlchemyItem {
    id: string,
    name: string,
    price: number,
    raw: number | null,
    percent: number | null,
    healFull: boolean,
}

export interface ShopCardProps {
    item: AlchemyItem,
    onBuy: (item: AlchemyItem) => void,
}