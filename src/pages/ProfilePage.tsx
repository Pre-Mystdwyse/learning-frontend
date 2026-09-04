import React, { useState } from 'react';
import { Inventory } from '../components/Inventory';
import { useHeroStore } from '../entities/hero/model/heroStore';
import { useShallow } from 'zustand/shallow';

const SKILLS = [
    { val: 'stealth', label: 'Скрытность' },
    { val: 'alchemy', label: 'Алхимия' },
    { val: 'blacksmith', label: 'Кузнечное дело' },
] as const;

export function ProfilePage() {
    const { name, age, mood, element, extra, info, updateProfile, heroImgSrc, heroImgDesc } = useHeroStore(
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
        }))
    );

    const [formData, setFormData] = useState({
        name: name || "",
        age: age || 20,
        mood: mood || "good-neutral",
        element: element || "fire",
        extra: extra || [],
        info: info || ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        
        setFormData((prev) => {
            switch (type) {
                case "checkbox": {
                    const isChecked = (event.target as HTMLInputElement).checked;
                    return {
                        ...prev,
                        [name]: isChecked
                            ? [...(prev[name as keyof typeof prev] as string[]), value]
                            : (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value)
                    };
                }
                default: {
                    return {
                        ...prev,
                        [name]: type === 'number' ? Number(value) : value
                    };
                }
            }
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateProfile(formData);
    };

    const inputClasses = "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-white">{name}</h2>
                        <span className="px-3 py-1 bg-violet-500/20 text-violet-400 text-sm font-bold rounded-full border border-violet-500/30">
                            Mythic
                        </span>
                    </div>
                    
                    <figure className="mb-6">
                        <div className="aspect-square bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-700 mb-2 flex items-center justify-center">
                            {heroImgSrc ? (
                                <img className="w-full h-full object-cover" src={heroImgSrc} alt={heroImgDesc} />
                            ) : (
                                <span className="text-slate-600">Нет аватара</span>
                            )}
                        </div>
                        <figcaption className="text-xs text-slate-500 text-center italic">
                            А это типа подпись картинки
                        </figcaption>
                    </figure>

                    <h3 className="text-lg font-bold text-white mb-3 border-b border-slate-700 pb-2">Характеристики</h3>
                    <ul className="space-y-2 text-slate-300">
                        <li className="flex justify-between"><span>Интеллект</span> <strong className="text-violet-400">15</strong></li>
                        <li className="flex justify-between"><span>Ловкость</span> <strong className="text-violet-400">15</strong></li>
                        <li className="flex justify-between"><span>Сила</span> <strong className="text-violet-400">15</strong></li>
                    </ul>
                </div>

                <article className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-sm text-slate-400 leading-relaxed">
                    <p>
                        Жил-был Карбел в обычном современном городе. Однажды он, в ничем не примечательный день, неспеша прогуливался по улице, почти полностью погружённый в свои мысли. Всё вокруг было привычным, <em className="text-slate-300">обыденным</em>.
                    </p>
                    <p className="mt-2">
                        Однако в доселе знакомой улице он периферийно заметил необычное мерцание, некое искажение пространства вокруг себя...
                    </p>
                </article>
            </aside>

            <div className="lg:col-span-8 space-y-8">
                
                {/* Секция Формы */}
                <section className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-white mb-6">Настройки профиля</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Имя персонажа</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Возраст героя</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClasses} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="mood" className="block text-sm font-medium text-slate-400 mb-2">Мировоззрение</label>
                            <select name="mood" id="mood" required value={formData.mood} onChange={handleChange} className={inputClasses}>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <fieldset>
                                <legend className="text-sm font-medium text-slate-400 mb-3">Главная стихия</legend>
                                <div className="space-y-3">
                                    {['fire', 'earth', 'water', 'air'].map((elem) => (
                                        <label key={elem} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="radio" name="element" value={elem} onChange={handleChange} checked={formData.element === elem} required className="w-5 h-5 accent-violet-500" />
                                            <span className="text-slate-300 group-hover:text-white transition-colors capitalize">
                                                {elem === 'fire' ? 'Огонь' : elem === 'earth' ? 'Земля' : elem === 'water' ? 'Вода' : 'Воздух'}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="text-sm font-medium text-slate-400 mb-3">Дополнительные навыки</legend>
                                <div className="space-y-3">
                                    {SKILLS.map((skill) => (
                                        <label key={skill.val} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="extra"
                                                value={skill.val}
                                                onChange={handleChange}
                                                checked={formData.extra.includes(skill.val)}
                                                className="w-5 h-5 accent-violet-500 rounded"
                                            />
                                            <span className="text-slate-300 group-hover:text-white transition-colors">{skill.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        <fieldset>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Примечание для мастера</label>
                            <textarea
                                name="info"
                                value={formData.info}
                                rows={3}
                                placeholder="Изумительное изречение, если, конечно, необходимо"
                                onChange={handleChange}
                                className={`${inputClasses} resize-none`}
                            />
                        </fieldset>

                        <button type="submit" className="w-full md:w-auto px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-violet-600/20">
                            Принять изменения
                        </button>
                    </form>
                </section>

                <section className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
                    <Inventory />
                </section>

            </div>
        </div>
    );
}