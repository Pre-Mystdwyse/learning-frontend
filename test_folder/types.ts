export type BuyFailReason = "not_enough_gold" | "invalid_potion" | "corrupted_potion_data";

export interface HeroStats {
    hp: number,
    maxHp: number,
    gold: number,
    takeDamage: (amount: number) => void,
    buyAndConsumeItem: (item: AlchemyItem) => {
        success: boolean;
        reason: BuyFailReason | null;
        redundant: number | null;
    }
}

export type EffectType = 'heal_percent' | 'heal_raw' | 'heal_full' | 'damage';

export interface ItemEffect {
    type: EffectType,
    value?: number,
}

export interface AlchemyItem {
    id: string,
    name: string,
    price: number,
    effects: ItemEffect[],
}

export interface ShopCardProps {
    item: AlchemyItem,
    onBuy: (item: AlchemyItem) => void,
}