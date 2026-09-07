import { useState } from "react";
import { createPortal } from "react-dom";
import { useHeroStore } from "../entities/hero/model/heroStore";
import { QuestCardProps } from "../entities/hero/model/types";

export function QuestCard({ quest }: QuestCardProps) {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const acceptQuest = useHeroStore((state) => state.acceptQuest);

    const isActive = useHeroStore((state) => 
        state.activeQuests.some(q => q.id === quest.id)
    );

    function handleAccept() {
        acceptQuest(quest);
    }

    return (
        <article>
            <h3>{quest.title}</h3>
            <strong>{quest.goal}</strong>
            <strong>Награда:</strong>
            <button type="button" onClick={() => setIsModalOpen(true) }>
                Подробнее
            </button>
            {isModalOpen && createPortal(
                <div className="modal-overlay">
                    <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
                    <div className="modal-content">
                        <h3>{quest.modalTitle}</h3>
                        <p>
                            {quest.description}
                        </p>
                    </div>
                </div>,
                document.body
            )}
            <button className="accept-button" disabled={isActive} onClick={handleAccept}>
                {isActive ? 'Выполняется...' : 'Приступить'}
            </button>
        </article>
    );
}