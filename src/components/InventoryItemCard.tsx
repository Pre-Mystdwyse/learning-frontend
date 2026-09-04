import { InventoryItemCardProps } from "../entities/hero/model/types";
import { useHeroStore } from "../entities/hero/model/heroStore";

export function InventoryItemCard({ item }: InventoryItemCardProps) {
    const sellItem = useHeroStore((state) => state.sellItem);

    const handleSell = () => {
        sellItem(item.id);
    }
    
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 flex flex-col items-center text-center group">
            <img
                src={item.imgSrc}
                alt={item.imgDesc}
                className="h-24 w-24"
            />
            <p>{item.name}</p>
            <p>Цена: {item.price}</p>
            <button
                onClick={handleSell}
                className=""
            >
                Продать
            </button>
        </div>
    )
}