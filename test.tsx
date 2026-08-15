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
        precent: number | null,
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

    healABit: (amount, precent) => {
        const currentHp = get().hp;

        let nonEffective: number | null = null;
        let nullPotions: boolean = false;;

        let nextHp = currentHp;

        switch(true) {
            case (amount === null && precent === null):
                nullPotions = true;
                break;
            case (amount !== null && precent === null):
                nextHp = currentHp + amount;
                break;
            case (amount === null && precent !== null):
                nextHp = Math.round(currentHp * (1 + precent / 100));
                break;
            case (amount !== null && precent !== null):
                nextHp = Math.round((currentHp + amount) * (1 + (precent / 100)));
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

function byuHealingPotion() {
    
}