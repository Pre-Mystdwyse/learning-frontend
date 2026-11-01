import { ActiveQuest, Quest, useQuestActions } from "@/entities/quest"

interface StartQuestBtnProps {
    quest: Quest | ActiveQuest,
    isActive: boolean,
}

export function StartQuestBtn({ quest, isActive }: StartQuestBtnProps) {
    const { startQuest } = useQuestActions();

    const handleStart = () => {
        if(isActive) return;

        startQuest(quest);
    }
    return (
        <button
          className={`rounded-l-lg border-2 transition-all duration-300 ${!isActive ? 'border-violet-400 bg-purple-700 shadow-[0_0_8px_rgba(144,47,235,1)]' : 'border-green-400 bg-green-700 shadow-[0_0_8px_rgba(21,128,61,1)]'} p-1`}
          onClick={handleStart}
        >
          {isActive ? 'Выполняется...' : 'Начать'}
        </button>
    )
}