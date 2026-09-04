import { useHeroStore } from "../entities/hero/model/heroStore";
import { ShopItemCardProps } from "../entities/hero/model/types";
import { useState } from "react";

export function ShopItemCard({ itemData }: ShopItemCardProps) {
    const buyItem = useHeroStore((state) => state.buyItem);

    const [ isError, setIsError ] = useState<boolean>(false);

    const handleBuy = () => {
        setIsError(false);

        const result = buyItem(itemData);

        if (result.success === false) {
            setIsError(true);

            setTimeout(() => setIsError(false), 2000);
        }
    }

    return (
        <div className="group mx-auto flex w-full max-w-sm flex-col items-center justify-between rounded-xl border-2 border-violet-800 bg-gray-700 px-2 py-4 text-xl text-white transition-transform duration-300 hover:-translate-y-2">
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
      <div className="flex flex-1 items-center justify-center text-center break-all">{itemData.imgDesc}</div>
      <div className="mt-auto w-full flex-none">
        <div className="my-2 h-1 w-full bg-green-500"></div>
        <div className="mb-4 flex items-center justify-center gap-1">
          <div className="font-bold text-yellow-300 underline">Цена:</div>
          <div className="text-gray-300">{itemData.price}</div>
        </div>
        <button
            onClick={handleBuy} 
            className="group/btn relative w-full py-1 pb-2">
          <div className="absolute inset-0 origin-top rounded-xl border-3 border-violet-500 bg-violet-900 shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-transform duration-300 group-hover/btn:scale-y-115 group-hover/btn:shadow-[0_0_30px_rgba(139,92,246,0.8)]"></div>
          <span className="relative z-10 block text-2xl font-bold text-teal-100">Купить</span>
        </button>
      </div>
    </div>
    );
}