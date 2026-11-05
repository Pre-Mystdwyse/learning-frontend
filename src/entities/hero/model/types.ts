
export type CharacterMood = 'good-good' | 'good-neutral' | 'good-chaotic' | 'evil-good' | 'evil-neutral' | 'evil-chaotic';

export type CharacterElement = 'fire' | 'earth' | 'water' | 'air';

export type CharacterProfessions = 'blacksmith' | 'alchemy' | 'stealth';

export interface InventoryInstance {
    id: string,
    shopItemId: string,
}

export interface HeroState {
    name: string;
    gold: number;
    hp: number;
    maxHp: number;
    heroImgSrc: string;
    heroImgDesc: string;
    inventory: InventoryInstance[];

    age: number,
    mood: CharacterMood,
    element: CharacterElement | null,
    extra: CharacterProfessions[],
    info: string | null,
}

interface HeroStoreActions {
    buyItem: (itemId: string, itemPrice: number) => { success: boolean; reason?: string; };
    sellItem: (instanceId: string, price: number) => void;
    undo: () => void;
    updateProfile: (newData: Partial<HeroState>) => void;
    addGold: (amount: number) => void;
}

export interface HeroStore extends HeroState {
    history: HeroState[];

    actions: HeroStoreActions;
}

export interface StateWithHistory {
    history: any[],
}