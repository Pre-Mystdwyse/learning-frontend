import { useState } from "react"
import { useHeroStore } from "@/entities/hero"
import { ShopItem } from "@/entities/shop/model/types";

interface BuyItemBtnProps {
    itemData: ShopItem,
}

export function BuyItemBtn({ itemData }: BuyItemBtnProps) {
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
        <button onClick={handleBuy} className="group/btn relative z-10 w-full py-1 pb-2">
          <div className="pointer-events-none absolute inset-0 origin-top rounded-xl border-3 border-violet-500 bg-violet-900 shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-transform duration-300 md:group-hover/btn:scale-y-115 md:group-hover/btn:shadow-[0_0_30px_rgba(139,92,246,0.8)]"></div>
          <span className="relative z-20 block text-2xl font-bold text-teal-100">Купить</span>
        </button>
    )
}