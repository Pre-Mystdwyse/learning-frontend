import { RareShop } from '@/widgets/shop';
import { Inventory } from '@/widgets/inventory';
import { UndoInventoryBtn } from '@/features/undo-items';

export function ShopPage() {

  return (
    <div className="flex flex-col gap-8">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-violet-400 md:text-4xl">Торговый квартал</h1>
        <p className="mt-2 text-slate-400">
          Здесь можно купить лучшее снаряжение или продать лишнее
        </p>
      </header>

      <section>
        <RareShop />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Ваш инвентарь</h2>
          
          <UndoInventoryBtn />
          
        </div>

        <Inventory />
      </section>
    </div>
  );
}