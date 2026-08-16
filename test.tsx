import { create } from 'zustand'

interface HeroStats {
    hp: number,
    gold: number,
    takeDamage: (amount: number) => void,
    healFull: () => void,
    spendGold: (amount: number) => {
        ifNotEnoughGold: number | null;
    },
    healABit: (
        amount: number | null,
        percent: number | null,
    ) => {
        nonEffective: number | null;
        nullPotions: boolean;
    }
}

export const useHeroStore = create<HeroStats>((set, get) => ({
    hp: 100,
    gold: 50,

    takeDamage: (amount) => set((state) => ({ hp: state.hp - amount })),
    healFull: () => set({ hp: 100 }),

    spendGold: (amount) => {
        const currentGold = get().gold;

        if (currentGold >= amount) {
            set({ gold: currentGold - amount });
            return { ifNotEnoughGold: null };
        }
        else {
            return { ifNotEnoughGold: amount - currentGold };
        }
    },

    healABit: (amount, percent) => {
        const currentHp = get().hp;

        let nonEffective: number | null = null;
        let nullPotions: boolean = false;;

        let nextHp = currentHp;

        switch(true) {
            case (amount === null && percent === null):
                nullPotions = true;
                break;
            case (amount !== null && percent === null):
                nextHp = currentHp + amount;
                break;
            case (amount === null && percent !== null):
                nextHp = Math.round(currentHp * (1 + percent / 100));
                break;
            case (amount !== null && percent !== null):
                nextHp = Math.round((currentHp + amount) * (1 + (percent / 100)));
                break;
        }

        if (nextHp > 100) {
            nonEffective = nextHp - 100;
            nextHp = 100;
        }

        if (nextHp !== currentHp) {
            set({ hp: nextHp });
        }

        return {
            nonEffective,
            nullPotions,
        };
    }
}));

function HeroStats() {
    const heroHp = useHeroStore((state) => state.hp);
    const heroGold = useHeroStore((state) => state.gold);

    return (
        <header>
            <div className='heroStats'>
                {heroHpColorer(heroHp)}
                <div className='heroGold'>
                    {heroGold}
                </div>
            </div>
        </header>
    )
}

function heroHpColorer(currentHeroHp: number | null) {
    switch(true) {
        case (currentHeroHp === null || currentHeroHp < 0):
            console.log('хп героя === null || < 0');
            break;
        case (currentHeroHp !== null
            && currentHeroHp >= 75
            && currentHeroHp <= 100):
            return (
                <div className='heroHp greenHeroHp'>
                    {currentHeroHp}
                </div>
            )
        case (currentHeroHp !== null
            && currentHeroHp < 75
            && currentHeroHp >= 25):
            return (
                <div className='heroHp yellowHeroHp'>
                    {currentHeroHp}
                </div>
            )
        case (currentHeroHp !== null
            && currentHeroHp < 25
            && currentHeroHp > 0):
            return (
                <div className='heroHp redHeroHp'>
                    {currentHeroHp}
                </div>
            )
    };
}
