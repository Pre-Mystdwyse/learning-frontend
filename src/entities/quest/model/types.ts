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
    availableQuests: Quest[],
    activeQuests: ActiveQuest[],
    completedQuests: string[],
}

export interface QuestStore extends QuestState {
    isLoading: boolean,
    isError: boolean,

    loadOnLoad: () => Promise<void>,
    loadQuests: () => Promise<void>,
    startQuest: (questId: string) => void,
    endQuest: (questId: string) => void,
    syncActiveQuests: () => void,
}

export interface QuestProgressBarProps {
    quest: ActiveQuest,
}