import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { QuestState, QuestStore } from "./types";
import { fetchQuestsData } from "../../../shared/api/mockData/api";

const initialQuestsState: QuestState = {
    availableQuests: [],
    activeQuests: [],
    completedQuests: [],
}

export const useQuestStore = create<QuestStore> ()(
    persist(
        (set, get) => {
            return {
                ...initialQuestsState,

                loadQuests: () => {
                    const state = get();

                    if (state.availableQuests.length > 0) return;

                    return (fetchQuestsData());
                },

                loadMoreQuests: () => {
                    const state = get();

                    const excludeIds: string[] = [ ...state.activeQuests.map(q => q.id), ...state.completedQuests ];

                    return (fetchQuestsData(excludeIds));
                },

                startQuest: () => {
                    
                }

                endQuest:
            }
        }
    )
)