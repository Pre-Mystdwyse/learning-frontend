import { useEffect, useRef, useState } from 'react';
import { useProfileForm } from '../model/useProfileForm';
import { Controller } from 'react-hook-form';

const SKILLS = [
  { val: 'stealth', label: 'Скрытность' },
  { val: 'alchemy', label: 'Алхимия' },
  { val: 'blacksmith', label: 'Кузнечное дело' },
] as const;

const inputClasses = 'w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors';

export function UpdateProfileForm() {
  const { register, errors, onSubmit, control } = useProfileForm();

  const [elfWarning, setElfWarning] = useState(false);
  const elfTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (!elfTimerRef.current) return;

      clearTimeout(elfTimerRef.current);
    };
  }, []);

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <fieldset className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">Имя персонажа</label>
          <input
            type="text"
            {...register("name")}
            className={inputClasses}
          />
          <div className='mt-1 min-h-[1.5lh] transition-all duration-200'>
            {errors.name && (
              <p className='text-sm text-red-500 animate-fade-in'>
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">Возраст героя</label>

            <Controller
              control={control}
              name='age'
              render={({ field: { onChange, value, ref, onBlur } }) => (
                <div>
                  <input
                    type="text"
                    inputMode='numeric'
                    pattern='[0-9]*'
                    ref={ref}
                    onBlur={onBlur}
                    className={inputClasses}
                    value={(value as unknown) === "" ? "" : (value ?? "")}
                    onChange={(e) => {
                      //регулярное выражение находится в /../ \D означает ВСЁ, КРОМЕ ЦИФР, g - значит ВСЕ
                      const onlyNums = e.target.value.replace(/\D/g, "");

                      if (onlyNums === "") {
                        onChange("");
                        return;
                      }

                      let num = Number(onlyNums);

                      if (num > 999) {
                        num = 999;

                        setElfWarning(true);
                        if (elfTimerRef.current) clearTimeout(elfTimerRef.current);
                        elfTimerRef.current = setTimeout(() => setElfWarning(false), 3000);
                      }

                      onChange(num);
                    }}
                  />

                  <div className='mt-1 min-h-[1.5lh] transition-all duration-200'>
                    {errors.age && (
                      <p className='text-sm text-red-500 animate-fade-in'>
                        {errors.age.message}
                      </p>
                    )}

                    {!errors.age && elfWarning && (
                      <p className='text-sm text-orange-400 animate-fade-in'>
                        Вы не эльф! Возраст снижен до 999
                      </p>
                    )}
                  </div>
                </div>
              )}
            />

        </div>
      </fieldset>

      <fieldset>
        <label htmlFor="mood" className="mb-2 block text-sm font-medium text-slate-400">
          Мировоззрение
        </label>
        <select
          id="mood"
          required
          {...register("mood")}
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
                  value={elem}
                  {...register("element")}
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
          <legend className="mb-3 text-sm font-medium text-slate-400">Дополнительные навыки</legend>
          <div className="space-y-3">
            {SKILLS.map((skill) => (
              <label key={skill.val} className="group flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  value={skill.val}
                  {...register("extra")}
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
          rows={3}
          placeholder="Изумительное изречение, но если, конечно, необходимо"
          {...register("info")}
          className={`${inputClasses} resize-none`}
        />
        <div className='mt-1 min-h-[1.5lh] transition-all duration-200'>
            {errors.info && (
              <p className='text-sm text-red-500 animate-fade-in'>
                {errors.info.message}
              </p>
            )}
          </div>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-xl bg-violet-600 px-8 py-3 font-bold text-white shadow-lg shadow-violet-600/20 transition-colors hover:bg-violet-500 md:w-auto"
      >
        Принять изменения
      </button>
    </form>
  );
}
