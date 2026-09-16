import { RareShop } from "../components/RareShop";
import { Inventory } from '../components/Inventory';
import { useHeroStore } from '../entities/hero/model/heroStore';

function ShopPage() {
    const undo = useHeroStore((state) => state.undo);
    const historyLength = useHeroStore((state) => state.history.length);

    const hasHistory = historyLength > 0;

    return (
        <div className="flex flex-col gap-8">
            
            <header className="border-b border-slate-800 pb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-violet-400">Торговый квартал</h1>
                <p className="text-slate-400 mt-2">Здесь можно купить лучшее снаряжение или продать лишнее</p>
            </header>

            <section>
                <RareShop />
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Ваш инвентарь</h2>

                    <button
                        onClick={undo}
                        disabled={!hasHistory}
                        className="px-6 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold">
                        Отменить действие
                    </button>
                </div>

                <Inventory />
            </section>
        </div>
    )
}

export default ShopPage;