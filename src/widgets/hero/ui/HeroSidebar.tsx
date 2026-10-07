import { HeroMainCard, useHeroStore } from "@/entities/hero"

export function HeroSidebar() {
    const name = useHeroStore((state) => state.name);
    const heroImgSrc = useHeroStore((state) => state.heroImgSrc);
    const heroImgDesc = useHeroStore((state) => state.heroImgDesc);

    return (
        <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
        
        <HeroMainCard
            heroName={name}
            heroImgSrc={heroImgSrc}
            heroImgDesc={heroImgDesc}
        />

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
    )
}