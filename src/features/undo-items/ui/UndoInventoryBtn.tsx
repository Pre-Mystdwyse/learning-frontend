import { useHeroStore } from "@/entities/hero"

export function UndoInventoryBtn() {
    const undo = useHeroStore((state) => state.undo);
    const historyLength = useHeroStore((state) => state.history.length);

    const hasHistory = historyLength > 0;
    
    return (
        <button
            onClick={undo}
            disabled={!hasHistory}
            className="rounded-lg bg-slate-700 px-6 py-2 font-semibold text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Отменить действие
          </button>
    )
}