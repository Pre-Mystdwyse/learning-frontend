import { Inventory } from "@/widgets/inventory";
import { QuestBoard } from '@/widgets/quest-board';

export function QuestPage() {
  return (
    <main className="flex flex-col justify-center gap-4 rounded-xl border-2 border-slate-400 p-2 text-lg">
      <QuestBoard />
      <section>
        <Inventory />
      </section>
    </main>
  );
}
