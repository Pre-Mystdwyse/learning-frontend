import React, { useState } from 'react';
import { Inventory } from '@/widgets/inventory';
import { useHeroStore } from '@/entities/hero';
import { useShallow } from 'zustand/shallow';
import { HeroSidebar } from '@/widgets/hero';
import { UpdateProfileForm } from '@/features/update-profile';

const SKILLS = [
  { val: 'stealth', label: 'Скрытность' },
  { val: 'alchemy', label: 'Алхимия' },
  { val: 'blacksmith', label: 'Кузнечное дело' },
] as const;

export function ProfilePage() {
  const { name, age, mood, element, extra, info, updateProfile, heroImgSrc, heroImgDesc } =
    useHeroStore(
      useShallow((state) => ({
        name: state.name,
        age: state.age,
        mood: state.mood,
        element: state.element,
        extra: state.extra,
        info: state.info,
        updateProfile: state.updateProfile,
        heroImgSrc: state.heroImgSrc,
        heroImgDesc: state.heroImgDesc,
      })),
    );

  const [formData, setFormData] = useState({
    name: name || '',
    age: age || 20,
    mood: mood || 'good-neutral',
    element: element || 'fire',
    extra: extra || [],
    info: info || '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    setFormData((prev) => {
      switch (type) {
        case 'checkbox': {
          const isChecked = (event.target as HTMLInputElement).checked;
          return {
            ...prev,
            [name]: isChecked
              ? [...(prev[name as keyof typeof prev] as string[]), value]
              : (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
          };
        }
        default: {
          return {
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
          };
        }
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(formData);
  };

  const inputClasses =
    'w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors';

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
