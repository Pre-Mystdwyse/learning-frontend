import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { QuestState, QuestStore } from './types';
import { useHeroStore } from '@/entities/hero';

const initialQuestsState: QuestState = {
  activeQuests: [],
  completedQuests: [],
};

const activeTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export const useQuestStore = create<QuestStore>()(
  persist(
    (set, get) => {
      return {
        ...initialQuestsState,

        actions: {
          startQuest: (quest) => {
            if (!quest) {
              console.warn('Ошибка начала квеста: был некорректно передан квест в стор');
              return;
            }
  
            set((state) => ({
              activeQuests: [
                ...state.activeQuests,
                {
                  ...quest,
                  startedAt: Date.now(),
                },
              ],
            }));
  
            activeTimers[quest.id] = setTimeout(
              () => get().actions.endQuest(quest.id),
              quest.duration * 1000 + 500,
            );
          },
  
          endQuest: (questId) => {
            const foundQuest = get().activeQuests.find((q) => q.id === questId);
            const reward = foundQuest?.reward ?? 0;
  
            useHeroStore.getState().actions.addGold(reward);

            set((state) => {  
              return {
                activeQuests: state.activeQuests.filter((q) => q.id !== questId),
                completedQuests: [...state.completedQuests, questId],
              };
            });
  
            if (activeTimers[questId]) {
              clearTimeout(activeTimers[questId]);
              delete activeTimers[questId];
            }
          },
  
          syncActiveQuests: () => {
            const currentTime = Date.now();
            const currentQuests = get().activeQuests;
  
            currentQuests.forEach((q) => {
              const endTime = q.duration * 1000 + q.startedAt;
  
              if (endTime <= currentTime) {
                get().actions.endQuest(q.id);
              }
              else {
                if (activeTimers[q.id]) {
                  clearTimeout(activeTimers[q.id]);
                }
                const timeRemains = endTime - currentTime;
                activeTimers[q.id] = setTimeout(() => get().actions.endQuest(q.id), timeRemains + 500);
              }
            });
          },
        }
      };
    },
    {
      name: 'quest-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeQuests: state.activeQuests,
        completedQuests: state.completedQuests,
      }),
    },
  ),
);
