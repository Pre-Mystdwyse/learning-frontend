

export interface InventoryItem {
    id: string;
    name: string;
    price: number;
    imgSrc: string;
    imgDesc: string;
}

export interface InventoryItemCardProps {
    item: InventoryItem,
}

export type CharacterMood = 'good-good' | 'good-neutral' | 'good-chaotic' | 'evil-good' | 'evil-neutral' | 'evil-chaotic';

export type CharacterElement = 'fire' | 'earth' | 'water' | 'air';

export type CharacterProfessions = 'blacksmith' | 'alchemy' | 'stealth';

export interface HeroState {
    name: string;
    gold: number;
    hp: number;
    maxHp: number;
    heroImgSrc: string;
    heroImgDesc: string;
    inventory: InventoryItem[];

    age: number,
    mood: CharacterMood,
    element: CharacterElement | null,
    extra: CharacterProfessions[],
    info: string | null,
}

export interface HeroStore extends HeroState {
    history: HeroState[];

    buyItem: (itemData: Omit<InventoryItem, 'id'>) => { success: boolean; reason?: string; };
    sellItem: (itemId: string) => void;
    undo: () => void;
    updateProfile: (newData: Partial<HeroState>) => void;
    addGold: (amount: number) => void;
}

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

export interface ShopItemCardProps {
    itemData: ShopItem,
}

export interface StateWithHistory {
    history: any[],
}

export interface UseModalBehaviorOptions {
    isOpen: boolean,
    onClose: () => void,
}