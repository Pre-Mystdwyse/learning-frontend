import { useMemo, useRef, useEffect } from 'react';
import { useHeroStore } from '../entities/hero/model/heroStore';
import { InventoryItemCard } from './InventoryItemCard';

export function Inventory() {
  const currentHeroInventory = useHeroStore((state) => state.inventory);

  const hasItems = currentHeroInventory && currentHeroInventory.length > 0;
  const listRef = useRef<HTMLDivElement>(null);

  const totalCost = useMemo(() => {
    return currentHeroInventory?.reduce((sum, item) => sum + item.price, 0);
  }, [currentHeroInventory]);

  useEffect(() => {
    if (hasItems) {
      listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentHeroInventory]);

  return (
    <article>
      <div className='w-full h-16 bg-slate-700 rounded-t-3xl overflow-hidden flex items-center justify-center relative'>
        <h3 className="text-xl text-violet-300 md:text-3xl relative z-10">
          {hasItems ? 'Инвентарь персонажа' : 'Пока что в инвентаре только эхо...'}
        </h3>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px),repeating-linear-gradient(-45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px)] opacity-50 rotate-180"></div>
        <div className='absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle,transparent_50%,rgba(15,23,42,0.8)_100%)]'></div>
      </div>
      <div className='w-full h-16 my-4 relative overflow-hidden bg-slate-700 rounded-b-3xl'>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px),repeating-linear-gradient(-45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px)] opacity-50"></div>
        <div className='absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle,transparent_50%,rgba(15,23,42,0.8)_100%)]'></div>
      </div>
      {hasItems && (
        <div ref={listRef} className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
          {currentHeroInventory.map((item) => (
            <InventoryItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
      <div className='grid grid-cols-3 gap-2 my-4 lg:mx-42'>
        <div className='bg-slate-500 p-3 col-span-2 rounded-tl-3xl flex items-center'>
          <p>Общая стоимость инвентаря:</p>
        </div>
        <div className='bg-slate-500 p-3 row-span-2 rounded-r-3xl grid grid-rows-2 gap-2 text-center font-bold'>
          <div className='flex items-center justify-center'>
            {totalCost}
          </div>
          <div className='flex items-center justify-center'>
            {currentHeroInventory.length}
          </div>
        </div>
        <div className='bg-slate-500 p-3 col-span-2 rounded-bl-3xl flex items-center'>
          <p>Общее количество предметов в инвентаре:</p>
        </div>
      </div>
    </article>
  );
}
