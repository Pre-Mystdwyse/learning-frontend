import { useState } from "react";
import { createPortal } from "react-dom";
import { useHero } from "../entities/hero/model/HeroProvider";

function QuestCard({ quest }) {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const { hero, setHero } = useHero();

    const isActive = hero.activeQuests?.some(activeQuest => activeQuest.id === quest.id) || false;

    function handleAccept() {
        setHero(prev => {
            const alreadyAccepted = prev.activeQuests?.some(q => q.id === quest.id);
            if (alreadyAccepted) return prev;

            return {
                ...prev,
                activeQuests: [ ...(prev.activeQuests || []), quest]
            };
        });
    }

    return (
        <article id={quest.id} className={`quest-card ${quest.difficulty}`}>
                <h3>{quest.title}</h3>
                <strong className="target">{quest.target}</strong>
                <strong className="reward">Награда:</strong>
                <div className="img-box">
                    <img
                    className="item-img"
                    src={quest.rewardImg}
                    alt={quest.imgDescription}
                    />
                </div>
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

export default QuestCard;