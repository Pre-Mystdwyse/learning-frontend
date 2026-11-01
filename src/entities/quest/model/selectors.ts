import { useShallow } from "zustand/shallow";
import { useQuestStore } from "./questStore";

export const useQuestActions = () => useQuestStore((state) => state.actions);

export const useQuestArrays = () => useQuestStore(useShallow((state) => ({
    activeQuests: state.activeQuests,
    completedQuests: state.completedQuests,
})));