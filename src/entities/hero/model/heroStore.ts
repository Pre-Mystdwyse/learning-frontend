import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { HeroState, HeroStore, InventoryItem } from "./types";
import { withHistory } from "./middlewares";

const initialHeroState: HeroState = {
    name: 'Карбел',
    gold: 10000,
    hp: 100,
    maxHp: 100,
    heroImgSrc: 'images/main/karbel.png',
    heroImgDesc: '',
    inventory: [],
    age: 20,
    mood: 'good-neutral',
    element: null,
    extra: [],
    info: null,
}

export const useHeroStore = create<HeroStore>()(
    persist(
        withHistory((set, get) => ({
            ...initialHeroState,
            history: [],

            buyItem: (itemData) => {
                const currentGold = get().gold;

                if (currentGold < itemData.price) {
                    return { success: false, reason: "not_enough_gold"};
                };

                const newItem: InventoryItem = {
                    ...itemData,
                    id: crypto.randomUUID(),
                };

                set((state) => ({
                    gold: state.gold - itemData.price,
                    inventory: [ ...state.inventory, newItem ],
                }));

                return { success: true };
            },

            sellItem: (itemId) => {
                set((state) => {
                    const itemIndex = state.inventory.findIndex(item => item.id === itemId);
                    if (itemIndex === -1) return {};

                    const itemToSell = state.inventory[itemIndex];

                    return {
                        gold: state.gold + Math.floor(itemToSell.price / 2),
                        inventory: state.inventory.toSpliced(itemIndex, 1),
                    };
                });
            },

            undo: () => {
                set((state) => {
                    if (state.history.length === 0) return {};

                    return {
                        ...state.history.at(-1),
                        history: state.history.slice(0, -1),
                        skipHistory: true,
                    };
                });
            },

            updateProfile: (newData) => {
                set(() => ({
                    ...newData,
                }));
            },

            addGold: (amount) => {
                set((state) => ({
                    gold: state.gold + amount,
                    skipHistory: true,
                }));
            }
        })),
        {
            name: 'hero-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                name: state.name,
                gold: state.gold,
                hp: state.hp,
                maxHp: state.maxHp,
                heroImgSrc: state.heroImgSrc,
                heroImgDesc: state.heroImgDesc,
                inventory: state.inventory,
                age: state.age,
                mood: state.mood,
                element: state.element,
                extra: state.extra,
                info: state.info,
            }),
        }
    )
);