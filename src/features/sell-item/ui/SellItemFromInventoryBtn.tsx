import { useHeroActions } from "@/entities/hero"

interface SellItemFromInventoryBtnProps {
    itemId: string,
    price: number,
}

export function SellItemFromInventoryBtn({ itemId, price }: SellItemFromInventoryBtnProps) {
    const { sellItem } = useHeroActions();

    const handleSell = () => {
        sellItem(itemId, price);
    }
    return (
        <button
        onClick={handleSell}
        className="w-full rounded-sm border-2 border-red-500 bg-red-900 p-1 px-3 transition-all duration-300 group-hover:border-red-400 group-hover:bg-red-800 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.7)]"
      >
        Продать
      </button>
    )
}