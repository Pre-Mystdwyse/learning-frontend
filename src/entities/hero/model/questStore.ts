import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { QuestState, QuestStore } from "./types";

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

                loadQuests:

                reloadQuests:

                startQuest:

                endQuest:
            }
        }
    )
)