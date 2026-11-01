export type QuestDifficulty = 'easy' | 'medium' | 'hard';

export interface Quest {
    id: string,
    difficulty: QuestDifficulty,
    title: string,
    goal: string,
    reward: number,
    duration: number,
    modalTitle: string,
    description: string,
}

export interface ActiveQuest extends Quest {
    startedAt: number,
}

export interface QuestState {
    activeQuests: ActiveQuest[],
    completedQuests: string[],
}

interface QuestStoreActions {
    startQuest: (quest: Quest) => void,
    endQuest: (questId: string) => void,
    syncActiveQuests: () => void,
}

export interface QuestStore extends QuestState {
    actions: QuestStoreActions,
}