import { useState, useRef, useEffect } from "react"
import { useHeroStore } from "@/entities/hero"
import { ShopItem } from "@/entities/shop";

interface BuyItemBtnProps {
    itemData: ShopItem,
}

export function BuyItemBtn({ itemData }: BuyItemBtnProps) {
    const buyItem = useHeroStore((state) => state.buyItem);

    const [ isError, setIsError ] = useState<boolean>(false);

    //useRef не вызывает рендер и не удаляется при рендере. сам удаляется при размонтировании
    //но эффекты, которые он запускает, надо удалять через useEffect
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return() => {
            if(timerRef.current) {
                clearTimeout(timerRef.current);
            };
        };
    }, []);

    const handleBuy = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        };

        const result = buyItem(itemData);

        if (!result.success) {
            setIsError(true);

            timerRef.current = setTimeout(() => {
                setIsError(false);
            }, 2000);
        };
    }
    
    return (
        <button
            onClick={handleBuy}
            disabled={isError}
            className="group/btn relative z-10 w-full py-1 pb-2 cursor-pointer active:scale-95 transition-transform touch-manipulation
                disabled:cursor-not-allowed">
          <div 
            className="pointer-events-none absolute inset-0 origin-top rounded-xl border-3 border-violet-500 bg-violet-900 shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300
            md:group-hover/btn:scale-y-115 md:group-hover/btn:shadow-[0_0_30px_rgba(139,92,246,0.8)] group-disabled/btn:border-red-500 group-disabled/btn:bg-red-900 group-disabled/btn:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
            ></div>
            <span className="pointer-events-none relative z-20 block text-2xl font-bold text-teal-100">
                {isError ? "нет золота!" : "Купить"}
            </span>
        </button>
    )
}