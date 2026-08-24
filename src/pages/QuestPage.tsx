import { useState, useEffect, useCallback } from "react";
import { QuestCard } from "../components/QuestCard";
import { fetchQuestsData } from "../shared/api/mockData/api";
import { Quest } from "../entities/hero/model/types";
import { Inventory } from "../components/Inventory";

export function QuestPage() {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isError, setIsError ] = useState<boolean>(false);
    const [ data, setData ] = useState<Quest[]>([]);

    //useCallback нужен для запоминания ссылки на функцию
    //в этом контексте это нужно для useEffect, чтобы не войти в inf loop
    //в массив зависиомстей useCallback сейчас ничего не нужно
    //ибо эта функция не принимает ничего на вход
    //может понадобиться, если будут поданы данные на вход
    //если этого не сделать, то он будет помнить самые первые данные и только
    const loadQuests = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const questsData = await fetchQuestsData();
            setData(questsData);
        }
        catch {
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadQuests();
    }, [loadQuests]);

    function handleRefetch() {
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