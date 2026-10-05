import { QuestCard, useQuestStore } from '@/entities/quest';
import { useEffect, useMemo } from 'react';
import { StartQuestBtn } from '@/features/start-quest';

export function QuestBoard() {
  const availableQuests = useQuestStore((state) => state.availableQuests);
  const activeQuests = useQuestStore((state) => state.activeQuests);

  const data = useMemo(() => {
    return [...activeQuests, ...availableQuests];
  }, [activeQuests, availableQuests]);

  const isError = useQuestStore((state) => state.isError);
  const isLoading = useQuestStore((state) => state.isLoading);

  const loadOnLoad = useQuestStore((state) => state.loadOnLoad);

  useEffect(() => {
    loadOnLoad();
  }, [loadOnLoad]);

  const loadQuests = useQuestStore((state) => state.loadQuests);

  const handleRefetch = () => {
    loadQuests();
  };
  return (
    <section className="">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Доступные квесты</h2>
        <button
          onClick={handleRefetch}
          className="w-[30%] rounded-lg border-2 border-violet-300/60 bg-purple-600/60 py-1 transition duration-300 hover:border-violet-300 hover:bg-purple-600"
        >
          Добавить квесты
        </button>
      </div>
      <div className="h-1 w-full rounded-xl bg-green-500"></div>

      {isLoading && (
        <div>
          <p>Ищем поручения...</p>
        </div>
      )}

      {!isLoading && isError && (
        <div className="group relative">
          <div className="absolute -inset-0.5 rounded bg-red-500 opacity-75 blur transition duration-300 group-hover:opacity-100"></div>
          <div className="relative flex flex-col items-center justify-center gap-4 rounded border border-red-500 bg-slate-700 p-4 text-center text-teal-50">
            <p>
              Доска объявлений... <em className="animate-pulse text-xl text-red-300">исчезла...</em>{' '}
              Но на её месте танцует некая сущность
            </p>
            <img
              src="/gifs/dancing_hidden_king.gif"
              alt="ну типа ха-ха"
              className="rounded shadow-xl"
            />
            <p>Использовать заклинание изгнания сущности?</p>
            <button
              onClick={handleRefetch}
              className="w-full rounded border border-red-700 bg-red-900/75 p-1 opacity-80 shadow-[0_0_8px_rgba(148,10,10,1)] transition duration-300 group-hover:opacity-100"
            >
              Изгнать?
            </button>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="columns-1 gap-3 space-y-3 sm:columns-3xs">
          {data.map((quest) => {
            const isActive = 'startedAt' in quest;
            return (
              <QuestCard
                key={quest.id}
                quest={quest}
                actionSlot={<StartQuestBtn questId={quest.id} isActive={isActive} />}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
