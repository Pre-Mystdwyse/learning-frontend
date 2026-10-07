
interface HeroMainCardProps {
    heroName: string,
    heroImgSrc: string,
    heroImgDesc: string,
}

export function HeroMainCard({ heroName, heroImgSrc, heroImgDesc }: HeroMainCardProps) {

    return (
        <article className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-2xl font-bold text-white">{heroName}</h2>
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
        </article>
    )
}