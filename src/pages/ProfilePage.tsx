import { Inventory } from '@/widgets/inventory';
import { HeroSidebar } from '@/widgets/hero';
import { UpdateProfileForm } from '@/features/update-profile';

export function ProfilePage() {

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      
      <HeroSidebar />

      <div className="space-y-8 lg:col-span-8">
        <section className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-white">Настройки профиля</h2>

          <UpdateProfileForm />

        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <Inventory />
        </section>
      </div>
    </div>
  );
}
