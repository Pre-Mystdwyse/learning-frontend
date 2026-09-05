import { InventoryItemCardProps } from "../entities/hero/model/types";
import { useHeroStore } from "../entities/hero/model/heroStore";

export function InventoryItemCard({ item }: InventoryItemCardProps) {
    const sellItem = useHeroStore((state) => state.sellItem);

    const handleSell = () => {
        sellItem(item.id);
    }
    
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 flex flex-col justify-between items-center text-center gap-2 group">
            <img
                src={item.imgSrc}
                alt={item.imgDesc}
                className="h-24 w-24 border-2 border-violet-600 rounded-lg overflow-hidden shadow-[0_0_12px_rgba(139,92,246,0.5)]"
            />
            <p className="text-teal-100/90 font-bold">{item.name}</p>
            <p className="text-yellow-400">Цена: {item.price / 2}</p>
            <button
                onClick={handleSell}
                className="bg-red-900 p-1 px-3 border-2 border-red-500 rounded-sm w-full group-hover:bg-red-800 group-hover:border-red-400 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.7)]"
            >
                Продать
            </button>
        </div>
    )
}