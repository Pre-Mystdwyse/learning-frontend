import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { HeroState, HeroStore, InventoryItem } from "./types";

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
        (set, get) => {
            const createSnapshot = (state: HeroStore): HeroState => {
                const {
                    history, buyItem, sellItem, undo,
                    ...pureHeroState
                } = state;
                return pureHeroState;
            }
            return {
                ...initialHeroState,
                history: [],

                buyItem: (itemData) => {
                    const state = get();

                    if (state.gold < itemData.price) {
                        return { success: false, reason: "not_enough_gold" };
                    }

                    const newItem: InventoryItem = {
                        ...itemData,
                        id: crypto.randomUUID(),
                    };

                    set({
                        history: [...state.history, createSnapshot(state)],
                        gold: state.gold - itemData.price,
                        inventory: [...state.inventory, newItem],
                    });

                    return { success: true };
                },

                sellItem: (itemId) => {
                    const state = get();
                    const itemToSell = state.inventory.find(item => item.id === itemId);

                    if (!itemToSell) return;

                    set ({
                        history: [...state.history, createSnapshot(state)],
                        gold: state.gold + Math.floor(itemToSell.price / 2),
                        inventory: state.inventory.filter(item => item.id !== itemId),
                    });
                },

                undo: () => {
                    const state = get();
                    
                    if (state.history.length === 0) return;

                    const previousState = state.history[state.history.length - 1];
                    const newHistory = state.history.slice(0, -1);

                    set ({
                        ...previousState,
                        history: newHistory,
                    });
                },

                updateProfile: (newData) => {
                    const state = get();

                    set({
                        history: [ ...state.history, createSnapshot(state)],
                        ...newData,
                    });
                }
        }},
        {
            name: 'hero-storage', //это ключ в localStorage
            storage: createJSONStorage(() => localStorage),

            //тут указываются только те поля, которые нужно сохранять в localStorage
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