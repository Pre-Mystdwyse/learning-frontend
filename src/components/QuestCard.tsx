import { createPortal } from 'react-dom';
import { QuestCardProps } from '../entities/hero/model/types';
import { useState } from 'react';

export function QuestCard({ quest }: QuestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <article className="flex aspect-auto break-inside-avoid flex-col items-center justify-center gap-2 border-2 bg-gray-700 p-2 text-center">
      <h3>{quest.title}</h3>
      <div className="h-1 w-full rounded bg-green-500"></div>
      <strong>{quest.goal}</strong>
      <div className="h-1 w-full rounded bg-green-500"></div>
      <div className="flex items-center justify-center gap-2">
        <strong>Награда:</strong>
        <strong>{quest.reward}</strong>
        <img src="/images/all/gold-coins.png" alt="золотые монеты" className="h-[1em] w-[1em]" />
      </div>
      <div className="relative grid grid-cols-2 grid-rows-2 gap-1">
        <div className="ml-auto w-[42%] rounded-tl-lg border-2 border-violet-400 bg-purple-700 p-1 shadow-[0_0_8px_rgba(144,47,235,1)]"></div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-r-lg border-2 border-violet-400 bg-purple-700 p-1 shadow-[0_0_8px_rgba(144,47,235,1)]"
        >
          Подробнее
        </button>
        <button className="rounded-l-lg border-2 border-violet-400 bg-purple-700 p-1 shadow-[0_0_8px_rgba(144,47,235,1)]">
          Начать
        </button>
        <div className="w-[42%] rounded-br-lg border-2 border-violet-400 bg-purple-700 p-1 shadow-[0_0_8px_rgba(144,47,235,1)]"></div>
      </div>
      {isModalOpen &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
            <div className="modal-content">
              <h3>{quest.modalTitle}</h3>
              <p>{quest.description}</p>
            </div>
          </div>,
          document.body,
        )}
    </article>
  );
}
