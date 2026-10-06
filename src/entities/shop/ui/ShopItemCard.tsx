import { ShopItem } from '../model/types';

export interface ShopItemCardProps {
    itemData: ShopItem,
    actionSlot?: React.ReactNode,
}

export function ShopItemCard({ itemData, actionSlot }: ShopItemCardProps) {

  return (
    <div className="group mx-auto flex w-full max-w-sm flex-col items-center justify-between rounded-xl border-2 border-violet-800 bg-gray-700 px-2 py-4 text-xl text-white transition-transform duration-300 md:hover:-translate-y-2">
      <div className="flex w-full flex-none flex-col items-center">
        <div className="relative inline-block">
          <img
            className="block h-30 w-30 rounded-md border border-green-500 object-cover"
            src={itemData.imgSrc}
            alt={itemData.imgDesc}
          />
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-600 bg-gray-400 p-1 text-xs font-bold text-violet-500">
            Эпический
          </div>
        </div>
        <div>{itemData.name}</div>
        <div className="my-2 h-1 w-full bg-green-500"></div>
      </div>
      <div className="flex flex-1 items-center justify-center text-center">{itemData.imgDesc}</div>
      <div className="mt-auto w-full flex-none">
        <div className="my-2 h-1 w-full bg-green-500"></div>
        <div className="mb-4 flex items-center justify-center gap-1">
          <div className="font-bold text-yellow-300 underline">Цена:</div>
          <div className="text-gray-300">{itemData.price}</div>
        </div>

        {actionSlot}

      </div>
    </div>
  );
}
