import { useMemo, useRef, useEffect } from 'react';
import { useHeroStore } from '@/entities/hero';
import { InventoryItemCard } from '@/entities/inventory';
import { SellItemFromInventoryBtn } from '@/features/sell-item/ui/SellItemFromInventoryBtn';

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
      <div className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded-t-3xl bg-slate-700">
        <h3 className="relative z-10 text-xl text-violet-300 md:text-3xl">
          {hasItems ? 'Инвентарь персонажа' : 'Пока что в инвентаре только эхо...'}
        </h3>
        <div className="absolute inset-0 rotate-180 bg-[repeating-linear-gradient(45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px),repeating-linear-gradient(-45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px)] opacity-50"></div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle,transparent_50%,rgba(15,23,42,0.8)_100%)]"></div>
      </div>
      <div className="relative my-4 h-16 w-full overflow-hidden rounded-b-3xl bg-slate-700">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px),repeating-linear-gradient(-45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px)] opacity-50"></div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle,transparent_50%,rgba(15,23,42,0.8)_100%)]"></div>
      </div>
      {hasItems && (
        <div ref={listRef} className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
          {currentHeroInventory.map((item) => (
            <InventoryItemCard
              key={item.id}
              item={item}
              actionSlot={<SellItemFromInventoryBtn itemId={item.id} />}
            />
          ))}
        </div>
      )}
      <div className="my-4 grid grid-cols-3 gap-2 lg:mx-42">
        <div className="col-span-2 flex items-center rounded-tl-3xl bg-slate-500 p-3">
          <p>Общая стоимость инвентаря:</p>
        </div>
        <div className="row-span-2 grid grid-rows-2 gap-2 rounded-r-3xl bg-slate-500 p-3 text-center font-bold">
          <div className="flex items-center justify-center">{totalCost}</div>
          <div className="flex items-center justify-center">{currentHeroInventory.length}</div>
        </div>
        <div className="col-span-2 flex items-center rounded-bl-3xl bg-slate-500 p-3">
          <p>Общее количество предметов в инвентаре:</p>
        </div>
      </div>
    </article>
  );
}
