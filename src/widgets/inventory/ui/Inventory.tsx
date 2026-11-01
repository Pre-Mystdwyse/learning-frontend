import { useMemo } from 'react';
import { useHeroStore } from '@/entities/hero';
import { InventoryItemCard } from '@/entities/inventory';
import { SellItemFromInventoryBtn } from '@/features/sell-item';
import { useQuery } from '@tanstack/react-query';
import { getShopItems, ShopItem } from '@/entities/shop';

export function Inventory() {
  const inventoryIds = useHeroStore((state) => state.inventory);

  const {
    data: shopItems,
    isLoading,
  } = useQuery({
    queryKey: ['ShopItems'],
    queryFn: getShopItems,
  });

  const shopDictionary = useMemo(() => {
    if (!shopItems) return new Map<string, ShopItem>();
    return new Map(shopItems.map(item => [item.id, item] as [string, ShopItem]));
  }, [shopItems]);

  const fullInventoryItems = useMemo(() => {
    if (!inventoryIds || inventoryIds.length === 0) return [];

    //суть flatMap в том, что он и редачит данные, и сплющивает в 1 плоскость вложенности
    //каждый массив распаковывается, отчего в данном случае пустой массив перестаёт существовать
    //а массив, в котором объект просто отдаёт этот объект
    return inventoryIds.flatMap(instance => {
      const matchedItem = shopDictionary.get(instance.shopItemId);

      if (!matchedItem) return [];

      return [{
        uuid: instance.id,
        ...matchedItem,
      }];
    });
  }, [inventoryIds, shopDictionary]);

  const hasItems = fullInventoryItems.length > 0;

  const totalCost = useMemo(() => {
    return fullInventoryItems?.reduce((sum, item) => sum + item.price, 0);
  }, [fullInventoryItems]);

  return (
    <article>
      <div className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded-t-3xl bg-slate-700">
        <h3 className="relative z-10 text-xl text-violet-300 md:text-3xl">
          {isLoading
            ? 'Загрузка инвентаря...'
            : hasItems
              ? 'Инвентарь персонажа'
              : 'Пока что в инвентаре только эхо...'}
        </h3>
        <div className="absolute inset-0 rotate-180 bg-[repeating-linear-gradient(45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px),repeating-linear-gradient(-45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px)] opacity-50"></div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle,transparent_50%,rgba(15,23,42,0.8)_100%)]"></div>
      </div>
      <div className="relative my-4 h-16 w-full overflow-hidden rounded-b-3xl bg-slate-700">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px),repeating-linear-gradient(-45deg,transparent,transparent_7px,#94a3b8_20px,#94a3b8_12px)] opacity-50"></div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle,transparent_50%,rgba(15,23,42,0.8)_100%)]"></div>
      </div>
      {hasItems && !isLoading && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
          {fullInventoryItems.map((item) => (
            <InventoryItemCard
              key={item.uuid}
              item={item}
              actionSlot={<SellItemFromInventoryBtn itemId={item.uuid} price={item.price} />}
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
          <div className="flex items-center justify-center">{fullInventoryItems.length}</div>
        </div>
        <div className="col-span-2 flex items-center rounded-bl-3xl bg-slate-500 p-3">
          <p>Общее количество предметов в инвентаре:</p>
        </div>
      </div>
    </article>
  );
}
