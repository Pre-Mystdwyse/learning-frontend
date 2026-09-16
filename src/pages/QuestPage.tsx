import { useState, useEffect, useCallback } from "react";
import { QuestCard } from "../components/QuestCard";
import { Inventory } from "../components/Inventory";
import { useQuestStore } from "../entities/hero/model/questStore";

export function QuestPage() {
    const data = useQuestStore((state) => state.availableQuests);

    const isError = useQuestStore((state) => state.isError);
    const isLoading = useQuestStore((state) => state.isLoading);

    const loadOnLoad = useQuestStore((state) => state.loadOnLoad);
    const loadQuests = useQuestStore((state) => state.loadQuests);

    useEffect(() => {
        loadOnLoad();
    }, [loadOnLoad]);

    const handleRefetch = () => {
        loadQuests();
    }

    return (
        <main className="border-2 rounded-xl border-slate-400 text-lg p-2 flex flex-col justify-center gap-4">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Доступные квесты</h2>
                <button
                    onClick={handleRefetch}
                    className="bg-purple-600/60 w-[30%] py-1 border-2 rounded-lg border-violet-300/60 transition duration-300 hover:border-violet-300 hover:bg-purple-600"
                >Добавить квесты</button>
            </div>
            <div className="h-1 w-full bg-green-500 rounded-xl"></div>
            <section className="">
                {isLoading && (
                    <div>
                        <p>Ищем поручения...</p>
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-red-500 rounded blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-slate-700 text-teal-50 border rounded border-red-500 flex flex-col p-4 gap-4 justify-center items-center text-center">
                            <p>Доска объявлений... <em className="text-red-300 text-xl animate-pulse">исчезла...</em> Но на её месте танцует некая сущность</p>
                            <img src="/gifs/dancing_hidden_king.gif" alt="ну типа ха-ха" className="rounded shadow-xl"/>
                            <p>Использовать заклинание изгнания сущности?</p>
                            <button onClick={handleRefetch} className="bg-red-900/75 w-full p-1 border border-red-700 rounded shadow-[0_0_8px_rgba(148,10,10,1)] opacity-80 group-hover:opacity-100 transition duration-300">Изгнать?</button>
                        </div>
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="columns-2 sm:columns-3xs gap-3 space-y-3">
                        {data.map((quest) => (
                            <QuestCard
                                key={quest.id}
                                quest={quest}
                            />
                        ))}
                    </div>
                )}
            </section>
            <section>
                <Inventory />
            </section>
        </main>
    )
}