import React, { useState } from 'react';
import { Inventory } from '@/widgets/inventory';
import { useHeroStore } from '@/entities/hero';
import { useShallow } from 'zustand/shallow';

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
      <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <span className="rounded-full border border-violet-500/30 bg-violet-500/20 px-3 py-1 text-sm font-bold text-violet-400">
              Mythic
            </span>
          </div>

          <figure className="mb-6">
            <div className="mb-2 flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-slate-700 bg-slate-900">
              {heroImgSrc ? (
                <img className="h-full w-full object-cover" src={heroImgSrc} alt={heroImgDesc} />
              ) : (
                <span className="text-slate-600">Нет аватара</span>
              )}
            </div>
            <figcaption className="text-center text-xs text-slate-500 italic">
              А это типа подпись картинки
            </figcaption>
          </figure>

          <h3 className="mb-3 border-b border-slate-700 pb-2 text-lg font-bold text-white">
            Характеристики
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li className="flex justify-between">
              <span>Интеллект</span> <strong className="text-violet-400">15</strong>
            </li>
            <li className="flex justify-between">
              <span>Ловкость</span> <strong className="text-violet-400">15</strong>
            </li>
            <li className="flex justify-between">
              <span>Сила</span> <strong className="text-violet-400">15</strong>
            </li>
          </ul>
        </div>

        <article className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 text-sm leading-relaxed text-slate-400">
          <p>
            Жил-был Карбел в обычном современном городе. Однажды он, в ничем не примечательный день,
            неспеша прогуливался по улице, почти полностью погружённый в свои мысли. Всё вокруг было
            привычным, <em className="text-slate-300">обыденным</em>.
          </p>
          <p className="mt-2">
            Однако в доселе знакомой улице он периферийно заметил необычное мерцание, некое
            искажение пространства вокруг себя...
          </p>
        </article>
      </aside>

      <div className="space-y-8 lg:col-span-8">
        {/* Секция Формы */}
        <section className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-white">Настройки профиля</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <fieldset className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Имя персонажа
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Возраст героя
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </fieldset>

            <fieldset>
              <label htmlFor="mood" className="mb-2 block text-sm font-medium text-slate-400">
                Мировоззрение
              </label>
              <select
                name="mood"
                id="mood"
                required
                value={formData.mood}
                onChange={handleChange}
                className={inputClasses}
              >
                <optgroup label="Добро">
                  <option value="good-good">Законно-добрый</option>
                  <option value="good-neutral">Нейтрально-добрый</option>
                  <option value="good-chaotic">Хаотично-добрый</option>
                </optgroup>
                <optgroup label="Зло">
                  <option value="evil-good">Законно-злой</option>
                  <option value="evil-neutral">Нейтрально-злой</option>
                  <option value="evil-chaotic">Хаотично-злой</option>
                </optgroup>
              </select>
            </fieldset>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-slate-400">Главная стихия</legend>
                <div className="space-y-3">
                  {['fire', 'earth', 'water', 'air'].map((elem) => (
                    <label key={elem} className="group flex cursor-pointer items-center gap-3">
                      <input
                        type="radio"
                        name="element"
                        value={elem}
                        onChange={handleChange}
                        checked={formData.element === elem}
                        required
                        className="h-5 w-5 accent-violet-500"
                      />
                      <span className="text-slate-300 capitalize transition-colors group-hover:text-white">
                        {elem === 'fire'
                          ? 'Огонь'
                          : elem === 'earth'
                            ? 'Земля'
                            : elem === 'water'
                              ? 'Вода'
                              : 'Воздух'}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-sm font-medium text-slate-400">
                  Дополнительные навыки
                </legend>
                <div className="space-y-3">
                  {SKILLS.map((skill) => (
                    <label key={skill.val} className="group flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        name="extra"
                        value={skill.val}
                        onChange={handleChange}
                        checked={formData.extra.includes(skill.val)}
                        className="h-5 w-5 rounded accent-violet-500"
                      />
                      <span className="text-slate-300 transition-colors group-hover:text-white">
                        {skill.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <fieldset>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Примечание для мастера
              </label>
              <textarea
                name="info"
                value={formData.info}
                rows={3}
                placeholder="Изумительное изречение, если, конечно, необходимо"
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
              />
            </fieldset>

            <button
              type="submit"
              className="w-full rounded-xl bg-violet-600 px-8 py-3 font-bold text-white shadow-lg shadow-violet-600/20 transition-colors hover:bg-violet-500 md:w-auto"
            >
              Принять изменения
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <Inventory />
        </section>
      </div>
    </div>
  );
}
