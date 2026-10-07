import { useProfileForm } from '../model/useProfileForm';

const SKILLS = [
  { val: 'stealth', label: 'Скрытность' },
  { val: 'alchemy', label: 'Алхимия' },
  { val: 'blacksmith', label: 'Кузнечное дело' },
] as const;

const inputClasses = 'w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors';

export function UpdateProfileForm() {
  const { handleChange, formData, handleSubmit } = useProfileForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <fieldset className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">Имя персонажа</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">Возраст героя</label>
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
          <legend className="mb-3 text-sm font-medium text-slate-400">Дополнительные навыки</legend>
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
          placeholder="Изумительное изречение, но если, конечно, необходимо"
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
  );
}
