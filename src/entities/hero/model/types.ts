

export interface InventoryItem {
    id: string;
    name: string;
    price: number;
    imgSrc: string;
    imgDesc: string;
}

export interface HeroState {
    name: string;
    gold: number;
    hp: number;
    maxHp: number;
    heroImgSrc: string;
    heroImgDesc: string;
    inventory: InventoryItem[];
    activeQuests: any[];
}

export interface HeroStore extends HeroState {
    history: HeroState[];

    buyItem: (itemData: Omit<InventoryItem, 'id'>) => { success: boolean; reason?: string; };
    sellItem: (itemId: string) => void;
    undo: () => void;
}