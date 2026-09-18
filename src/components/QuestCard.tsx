import { createPortal } from 'react-dom';
import { QuestCardProps } from '../entities/hero/model/types';
import { useState, useRef } from 'react';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { useQuestStore } from '../entities/hero/model/questStore';

export function QuestCard({ quest }: QuestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const startQuest = useQuestStore((state) => state.startQuest);

  const isActive = 'startedAt' in quest;

  const [translateY, setTranslateY] = useState(0);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return;

    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    if (deltaY > 0) {
      if (e.cancelable) {
        e.preventDefault();
      }

      setTranslateY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (translateY > 100) {
      setIsModalOpen(false);
    }

    setTranslateY(0);
  };

  useModalBehavior({
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false),
  });

  const handleStart = () => {
    if (isActive) return;

    startQuest(quest.id);
  }

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
        <div className={`ml-auto w-[42%] rounded-tl-lg border-2 p-1 transition-all duration-300 ${!isActive ? 'border-violet-400 bg-purple-700 shadow-[0_0_8px_rgba(144,47,235,1)]' : 'border-green-400 bg-green-700 shadow-[0_0_8px_rgba(21,128,61,1)]'}`}></div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-r-lg border-2 border-violet-400 bg-purple-700 p-1 shadow-[0_0_8px_rgba(144,47,235,1)]"
        >
          Подробнее
        </button>
        <button
          className={`rounded-l-lg border-2 transition-all duration-300 ${!isActive ? 'border-violet-400 bg-purple-700 shadow-[0_0_8px_rgba(144,47,235,1)]' : 'border-green-400 bg-green-700 shadow-[0_0_8px_rgba(21,128,61,1)]'} p-1`}
          onClick={handleStart}
        >
          {isActive ? "Выполняется..." : "Начать"}
        </button>
        <div className="w-[42%] rounded-br-lg border-2 border-violet-400 bg-purple-700 p-1 shadow-[0_0_8px_rgba(144,47,235,1)]"></div>
      </div>
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
            <div
              className="animate-fade-in absolute inset-0 z-0 bg-black/30 backdrop-blur-md"
              style={{
                opacity: Math.max(0.2, 1 - translateY / 300),
              }}
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div
              className={`relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border-2 border-violet-800 bg-slate-500 p-6 shadow-xl ${translateY === 0 ? 'animate-slide-up-mobile md:animate-slide-up' : ''} md:mb-0 md:max-h-none md:max-w-md md:rounded-lg`}
              style={{
                transform: translateY > 0 ? `translateY(${translateY}px` : undefined,
                transition: translateY === 0 ? 'transform 0.2s ease-out' : 'none',
              }}
            >
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="mx-auto -mt-4 mb-4 flex w-full cursor-grab touch-none justify-center pt-4 pb-2 active:cursor-grabbing md:hidden"
              >
                <div className="h-1.5 w-12 rounded-full bg-gray-300"></div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-800">{quest.modalTitle}</h3>
              <p className="leading-relaxed text-teal-100">{quest.description}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-6 w-full rounded-xl border border-slate-400 bg-slate-600 py-3 font-medium text-teal-100 active:bg-slate-400 md:hidden"
              >
                Закрыть
              </button>
            </div>
          </div>,
          document.body,
        )}
    </article>
  );
}
