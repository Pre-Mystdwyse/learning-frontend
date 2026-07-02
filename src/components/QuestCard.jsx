import { useState } from "react";

function QuestCard({ quest }) {
    const [ isModalOpen, setIsModalOpen ] = useState(false);

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
                { isModalOpen &&
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false) }>
                        <label htmlFor="modal-l1" className="modal-background" />
                        <div className="modal-content">
                        <h3>{quest.modalTitle}</h3>
                        <p>
                            {quest.description}
                        </p>
                        </div>
                    </div>
                }
                <button className="accept-button">Приступить</button>
                </article>
    );
}

export default QuestCard;