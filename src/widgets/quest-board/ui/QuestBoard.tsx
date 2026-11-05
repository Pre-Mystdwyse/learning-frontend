import { getQuests, QuestCard, useQuestArrays } from '@/entities/quest';
import { useMemo } from 'react';
import { StartQuestBtn } from '@/features/start-quest';
import { useShallow } from 'zustand/shallow';
import { useQuery } from '@tanstack/react-query';

export function QuestBoard() {
  const { activeQuests, completedQuests } = useQuestArrays();


  const excludeIds = useMemo(() => {
    const activeIds = activeQuests.map(q => q.id);
    return [
      ...activeIds,
      ...completedQuests,
    ];
  }, [activeQuests, completedQuests]);

  const {
    data,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['quests', excludeIds],
    queryFn: () => getQuests(excludeIds),
    refetchOnWindowFocus: false,
  });

  const fullData = useMemo(() => {
    return [
      ...activeQuests,
      ...(data || []),
    ]
  }, [activeQuests, data]);

  return (
    <section className="">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Доступные квесты</h2>
        <button
          onClick={() => refetch()}
          className="w-[30%] rounded-lg border-2 border-violet-300/60 bg-purple-600/60 py-1 transition duration-300 hover:border-violet-300 hover:bg-purple-600"
        >
          Поменять квесты
        </button>
      </div>
      <div className="h-1 w-full rounded-xl bg-green-500 my-2"></div>

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
              onClick={() => refetch()}
              className="w-full rounded border border-red-700 bg-red-900/75 p-1 opacity-80 shadow-[0_0_8px_rgba(148,10,10,1)] transition duration-300 group-hover:opacity-100"
            >
              Изгнать?
            </button>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="columns-1 gap-3 space-y-3 sm:columns-3xs">
          {fullData?.map((quest) => {
            const isActive = 'startedAt' in quest;
            return (
              <QuestCard
                key={quest.id}
                quest={quest}
                actionSlot={<StartQuestBtn quest={quest} isActive={isActive} />}
              />
            );
          })}
        </div>
      )}
      <div className="h-1 w-full rounded-xl bg-green-500 mt-4"></div>
    </section>
  );
}
