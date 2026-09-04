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
      <h3 className="mb-4 text-xl text-white md:text-3xl">
        {hasItems ? 'Предметы в инвентаре:' : 'Пока что в инвентаре только эхо...'}
      </h3>
      <div className='grid grid-cols-6 mb-13'>
        <div className='w-30 h-1 bg-slate-400 rounded origin-left rotate-21'></div>
        <div className=''></div>
      </div>
      {hasItems && (
        <div ref={listRef} className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
          {currentHeroInventory.map((item) => (
            <InventoryItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
      <p>Общая стоимость инвентаря: {totalCost} золота</p>
      <p>Общее количество предметов в инвентаре: {currentHeroInventory.length}</p>
    </article>
  );
}

{
  /* <article>
            <h3>
                {hasItems ? "Предметы в инвентаре:" : "Пока что в инвентаре только эхо..."}
            </h3>
            {hasItems && (
                <ul ref={listRef}>
                    {currentHeroInventory.map((item) => (
                        <li key={item.id}>
                            <img src={item.imgSrc} alt={item.imgDesc} />
                            <h3>{item.name}</h3>
                            <p>{item.price / 2}</p>
                            <button onClick={() => sellItem(item.id)}>Продать</button>
                        </li>
                    ))}
                </ul>
            )}
            <p>Общая стоимость инвентаря: {totalCost} золота</p>
            <p>Общее количество предметов в инвентаре: {currentHeroInventory.length}</p>
        </article> */
}
