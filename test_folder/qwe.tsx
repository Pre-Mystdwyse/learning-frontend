import { useState } from 'react';

export function QuestCardButtons() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Константы для настройки геометрии (в процентах)
  const divWidth = 21; // 42% от половины — это 21% от всей ширины
  const btnWidth = 50; // Кнопка занимает ровно 50%
  const centerCut = 6;  // Размер (радиус) вогнутого выреза по центру
  
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-800 text-white rounded-xl">
      {/* Контейнер нашей панели. relative позволяет позиционировать элементы друг над другом */}
      <div className="relative w-full h-24 select-none">
        
        {/* СЛОЙ 1: Векторная графика (SVG). Рисует все бордеры, фоны и вырезы */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(144,47,235,0.8)]"
        >
          {/* Общие стили для всех 4-х фигур */}
          <g fill="#7e22ce" stroke="#c084fc" strokeWidth="0.8" strokeLinejoin="round">
            
            {/* 1. Левый верхний декоративный DIV (сдвинут вправо, скруглен левый верхний и впуклый правый нижний) */}
            <path d={`
              M ${50 - divWidth} 2 
              H 48 
              Q 50 2, 50 ${50 - centerCut} 
              V 48 
              H ${50 - divWidth} 
              Z
            `} />

            {/* 2. Кнопка "Подробнее" (правая верхняя ячейка, впуклый левый нижний угол) */}
            <path d={`
              M 52 2 
              H ${52 + btnWidth - 4} 
              Q ${52 + btnWidth} 2, ${52 + btnWidth} 6 
              V 48 
              H 52 
              Q 50 48, 50 ${50 - centerCut}
              Z
            `} />

            {/* 3. Кнопка "Начать" (левая нижняя ячейка, впуклый правый верхний угол) */}
            <path d={`
              M ${48 - btnWidth} 52 
              V 94 
              Q ${48 - btnWidth} 98, ${48 - btnWidth + 4} 98 
              H 48 
              Q 50 52, 50 ${50 + centerCut}
              Z
            `} />

            {/* 4. Правый нижний декоративный DIV (базовое положение, впуклый левый верхний угол) */}
            <path d={`
              M 52 52 
              V ${50 + centerCut} 
              Q 50 52, 52 52 
              H ${52 + divWidth} 
              V 98 
              H 52 
              Z
            `} />
          </g>
        </svg>

        {/* СЛОЙ 2: Интерактивная сетка (HTML). Элементы абсолютно прозрачные, но стоят ровно на своих местах для кликов */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-[2%]">
          
          {/* Первый DIV (просто занимает место над графикой) */}
          <div className="w-[42%] ml-auto"></div>
          
          {/* Настоящая кнопка "Подробнее" */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full h-full flex items-center justify-center font-bold text-sm text-purple-100 hover:text-white active:scale-95 transition-transform"
          >
            Подробнее
          </button>
          
          {/* Настоящая кнопка "Начать" */}
          <button
            type="button"
            className="w-full h-full flex items-center justify-center font-bold text-sm text-purple-100 hover:text-white active:scale-95 transition-transform"
          >
            Начать
          </button>
          
          {/* Второй DIV */}
          <div className="w-[42%]"></div>
        </div>

        {/* Зеленый индикатор в самом центре выреза */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 h-4 w-4 rounded-full border border-green-300 shadow-[0_0_6px_#22c55e]"></div>
      </div>
    </div>
  );
}
