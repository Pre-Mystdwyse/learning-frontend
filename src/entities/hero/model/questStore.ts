import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { QuestState, QuestStore, ActiveQuest } from "./types";
import { fetchQuestsData } from "../../../shared/api/mockData/api";
import { useHeroStore } from "./heroStore";


const initialQuestsState: QuestState = {
    availableQuests: [],
    activeQuests: [],
    completedQuests: [],
}

const activeTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export const useQuestStore = create<QuestStore> ()(
    persist(
        (set, get) => {
            return {
                ...initialQuestsState,
                isLoading: false,

                loadQuests: async () => {
                    set({ isLoading: true });

                    try {
                        const state = get();

                        const allIds: string[] = [
                            ...state.availableQuests.map(q => q.id),
                            ...state.activeQuests.map(q => q.id),
                            ...state.completedQuests
                        ];

                        const loadedData = await fetchQuestsData(allIds);

                        set((state) => ({
                            availableQuests: [ ...state.availableQuests, ...loadedData ],
                        }));

                        return loadedData;
                    }
                    catch (error) {
                        console.error("ошибка при загрузке квестов: ", error);
                        throw error;
                    }
                    finally {
                        set({ isLoading: false });
                    }
                },

                startQuest: (questId) => {
                    const { availableQuests, endQuest } = get();

                    const questToMove = availableQuests.find(q => q.id === questId);

                    if (!questToMove) {
                        console.warn(`Квест с ID ${questId} не найден`);
                        return;
                    };

                    set((state) => ({
                        availableQuests: state.availableQuests.filter(q => q.id !== questId),
                        activeQuests: [
                            ...state.activeQuests,
                            {
                                ...questToMove,
                                startedAt: Date.now(),
                            }
                        ],
                    }));

                    activeTimers[questId] = setTimeout(endQuest, questToMove.duration * 100, questId);
                },

                endQuest: (questId) => {
                    set((state) => {
                       const foundQuest = state.activeQuests.find(q => q.id === questId);

                       useHeroStore.getState().addGold(foundQuest?.reward ?? 0);

                       return {
                        activeQuests: state.activeQuests.filter(q => q.id !== questId),
                        completedQuests: [ ...state.completedQuests, questId ],
                       }
                    });

                    delete activeTimers[questId];
                },

                syncActiveQuests: () => {
                    const currentTime = Date.now();

                    const stillActiveQuests: ActiveQuest[] = [];
                    const completedIds: string[] = [];

                    const currentQuests = get().activeQuests;
                    currentQuests.forEach(q => {
                        const endTime = q.startedAt + q.duration * 1000;
                        if (endTime <= currentTime) {
                            completedIds.push(q.id);
                            get().endQuest(q.id);
                        }
                        else {
                            stillActiveQuests.push(q);
                        };
                    });

                    set((state) => ({
                        activeQuests: stillActiveQuests,
                        completedQuests: [ ...state.completedQuests, ...completedIds ],
                    }));

                    stillActiveQuests.forEach(q => {
                        if (activeTimers[q.id]) {
                            clearTimeout(activeTimers[q.id])
                        };
                        const timeRemains = q.startedAt + q.duration * 1000 - Date.now();
                        activeTimers[q.id] = setTimeout(get().endQuest, timeRemains, q.id);
                    });
                }
            }
        },
        {
            name: 'quest-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                availableQuests: state.availableQuests,
                activeQuests: state.activeQuests,
                completedQuests: state.completedQuests,
            }),
        }
    )
);