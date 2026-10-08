import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { QuestState, QuestStore } from './types';
import { fetchQuestsData } from '@/shared/api';
import { useHeroStore } from '@/entities/hero';

const initialQuestsState: QuestState = {
  availableQuests: [],
  activeQuests: [],
  completedQuests: [],
};

const activeTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export const useQuestStore = create<QuestStore>()(
  persist(
    (set, get) => {
      return {
        ...initialQuestsState,
        isLoading: false,
        isError: false,

        loadOnLoad: async () => {
          const state = get();
          if (get().availableQuests.length > 0 || state.isLoading) return;

          //ts может писать, якобы await не сработает. для этого в интерфейсе нужно явно указать, что будет возвращён Promise<void>
          await get().loadQuests();
        },

        loadQuests: async () => {
          set({ isLoading: true, isError: false });

          const state = get();

          const excludeIds = [
            ...state.availableQuests.map((q) => q.id),
            ...state.activeQuests.map((q) => q.id),
            ...state.completedQuests,
          ];

          try {
            const loadedData = await fetchQuestsData(excludeIds);

            set((state) => ({
              availableQuests: [...state.availableQuests, ...loadedData],
            }));
          } catch (error) {
            set({ isError: true });
            console.error('Ошибка при загрузке данных: ', error);
          } finally {
            set({ isLoading: false });
          }
        },

        startQuest: (questId) => {
          const { availableQuests, endQuest } = get();

          const questToMove = availableQuests.find((q) => q.id === questId);

          if (!questToMove) {
            console.warn(`Квест с ID ${questId} не найден`);
            return;
          }

          set((state) => ({
            availableQuests: state.availableQuests.filter((q) => q.id !== questId),
            activeQuests: [
              ...state.activeQuests,
              {
                ...questToMove,
                startedAt: Date.now(),
              },
            ],
          }));

          activeTimers[questId] = setTimeout(
            () => endQuest(questId),
            questToMove.duration * 1000 + 500,
          );
        },

        endQuest: (questId) => {
          set((state) => {
            const foundQuest = state.activeQuests.find((q) => q.id === questId);

            useHeroStore.getState().addGold(foundQuest?.reward ?? 0);

            return {
              activeQuests: state.activeQuests.filter((q) => q.id !== questId),
              completedQuests: [...state.completedQuests, questId],
            };
          });

          delete activeTimers[questId];
        },

        syncActiveQuests: () => {
          const currentTime = Date.now();

          const currentQuests = get().activeQuests;

          currentQuests.forEach((q) => {
            const endTime = q.duration * 1000 + q.startedAt;

            if (endTime <= currentTime) {
              get().endQuest(q.id);
            } else {
              if (activeTimers[q.id]) {
                clearTimeout(activeTimers[q.id]);
              }
              const timeRemains = endTime - currentTime;
              activeTimers[q.id] = setTimeout(() => get().endQuest(q.id), timeRemains + 500);
            }
          });
        },
      };
    },
    {
      name: 'quest-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        availableQuests: state.availableQuests,
        activeQuests: state.activeQuests,
        completedQuests: state.completedQuests,
      }),
    },
  ),
);
