import { InventoryItem } from "@/entities/hero";

export interface InventoryItemCardProps {
    item: InventoryItem,
    actionSlot?: React.ReactNode,
}

export function InventoryItemCard({ item, actionSlot }: InventoryItemCardProps) {

  return (
    <div className="group flex flex-col items-center justify-between gap-2 rounded-xl border border-slate-700 bg-slate-800 p-3 text-center">
      <img
        src={item.imgSrc}
        alt={item.imgDesc}
        className="h-24 w-24 overflow-hidden rounded-lg border-2 border-violet-600 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
      />
      <p className="font-bold text-teal-100/90">{item.name}</p>
      <p className="text-yellow-400">Цена: {item.price / 2}</p>
      
      {actionSlot}

    </div>
  );
}
