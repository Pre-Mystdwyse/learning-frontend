import { create } from "zustand";
import { v7 as uuidv7 } from 'uuid';
import { persist, createJSONStorage } from "zustand/middleware";
import { HeroState, HeroStore } from "./types";
import { InventoryItem } from "@/entities/inventory";
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
                    //ошибка неработающих кнопок магазина при хосте в локальную сеть...
                    //этот api работает только при защищённом соединениии будь то https, либо localHost
                    //если хостить на локалку, где надо подключаться через http, то оно просто отключается и выдаёт udefined
                    // id: crypto.randomUUID(),

                    //и именно поэтому свечка и совершает свои колебания
                    //и именно поэтому я буду использовать стандарт индустрии - библиотеку uuid
                    //на данный момент v14.0.2
                    //почему v7? потому что первая часть (сколько-то первых бит) - это текущее время
                    //и именно поэтому свечка и совершает свои колебания
                    //и именно поэтому для бд это лучше, ибо каждая запись всегда будет заноситься на последнее место
                    //при этом доп пакет ставить не нужно, ибо он старый, а нужный уже идёт с установщиком
                    id: uuidv7(),
                    //в чём же отличие от v4? v4 - абсолютная случайность. база данных строится по B-дереву
                    //почти всегда будут выдаваться значения, которые нельзя поставить где-то в конце
                    //из-за этого бд нужно найти место, куда вставить, разрезать страницу, создать новую,
                    //вставить предыдущие значения до места вставки нового, вставить новое
                    //если на странице ещё есть место для сдвига - произойдёт сдвиг, но если страница занята полностью - она разделится
                    //b-деревья независимы и бд не умеет переносить данные из одной страницы на другую, поэтому и создаёт новые
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