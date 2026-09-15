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
        <main>
            <h2>Доступные квесты</h2>
            <section className="quest-board">
                {isLoading && (
                    <div className="loader">
                        <p>Ищем поручения...</p>
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="error-block">
                        <p>Доска объявлений... исчезла... Но на её месте танцует некая сущность</p>
                        <img src="/gifs/dancing_hidden_king.gif" alt="ну типа ха-ха" />
                        <p>Использовать заклинание изгнания сущности?</p>
                        <button onClick={handleRefetch}>Изгнать?</button>
                    </div>
                )}

                {!isLoading && !isError && (
                    data.map((quest) => (
                        <QuestCard
                        key={quest.id}
                        quest={quest}
                        />
                    ))
                )}
            </section>
            <section>
                <Inventory />
            </section>
        </main>
    )
}