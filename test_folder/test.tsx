import { create } from 'zustand'
import { HeroStats, AlchemyItem, ShopCardProps } from './types'
import { useState, useEffect } from 'react'
import { fetchAlchemyItems } from './api'
import { REQUIRED_VALUE_EFFECTS, EFFECT_STRATEGIES } from './effectStrategies'

export const useHeroStore = create<HeroStats>((set, get) => ({
    hp: 100,
    maxHp: 100,
    gold: 50,

    takeDamage: (amount) => set((state) => ({ hp: state.hp - amount })),
    buyAndConsumeItem: (item) => {
        const currentHp = get().hp;
        const currentMaxHp = get().maxHp;
        const currentGold = get().gold;

        if (currentGold < item.price) {
            return { success: false, reason: "not_enough_gold", redundant: null };
        }

        if (!item.effects || item.effects.length === 0) {
            return { success: false, reason: "invalid_potion", redundant: null };
        }

        let nextHp = currentHp;

        for (const effect of item.effects) {
            if (!effect || !effect.type || !EFFECT_STRATEGIES[effect.type]) {
                return { success: false, reason: "corrupted_potion_data", redundant: null };
            }

            if (REQUIRED_VALUE_EFFECTS[effect.type] && (effect.value === undefined || effect.value === 0)) {
                return { success: false, reason: "corrupted_potion_data", redundant: null };
            }

            const strategy = EFFECT_STRATEGIES[effect.type];
            nextHp = strategy(nextHp, currentMaxHp, effect.value ?? 0);
        }

        if (nextHp < 0) {
            nextHp = 0;
        }

        let overHeal = null;

        if (nextHp > currentMaxHp) {
            overHeal = nextHp - currentMaxHp;
            nextHp = currentMaxHp;
        }

        set({
            gold: currentGold - item.price,
            hp: nextHp,
        });
        return { success: true, reason: null, redundant: overHeal}
    }
}));

function HeroStats() {
    const heroHp = useHeroStore((state) => state.hp);
    const heroGold = useHeroStore((state) => state.gold);

    return (
        <header>
            <div className='heroStats'>
                <div className={`heroHp ${getHpHeroClass(heroHp)}`}>
                    {heroHp}
                </div>
                <div className='heroGold'>
                    {heroGold}
                </div>
            </div>
        </header>
    )
}

function getHpHeroClass(hp: number | null): string {
    if (hp === null || hp < 0) return 'redHeroHp';
    if (hp >= 75) return 'greenHeroHp';
    if (hp >= 25) return 'yellowHeroHp';
    return 'redHeroHp';
}

function AlchemyShop() {
    const [ items, setItems ] = useState<AlchemyItem[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    /*
    пример использования .then
    fetch('https://api.itupupuye.com/data')
        .then(response => response.json())
        .then(data => console.log(data));
    конец примера использования .then
    */

    useEffect(() =>{
        const loadItems = async () => {
            try {
                setIsLoading(true);
                const data = await fetchAlchemyItems();
                setItems(data);
            }
            catch(error) {
                console.error("У алхимика убежал спирт, он не может сейчас подойти...");
            }
            finally {
                setIsLoading(false);
            }
        };

        loadItems();
    }, []);

    /*
    старый вариант, который лучше не использовать
    useEffect(() => {
        fetchAlchemyItems()
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке товаров: ", error);
                setIsLoading(false);
            });
    }, []);
    конец старого варианта, который лучше не использовать
    */

    const buyAndConsumeItem = useHeroStore((state) => state.buyAndConsumeItem);

    const handleBuy = (item: AlchemyItem) => {
        const result = buyAndConsumeItem(item);

        if (!result.success) {
            //я знаю, что алерты - плохо
            //я заменю их позже на решения из библиотеки Sonner
            if (result.reason === "not_enough_gold") alert("Нужно больше золота!");
            if (result.reason === "invalid_potion") alert("Алхимик подсунул паль");
            if (result.reason === "corrupted_potion_data") alert("Тут спирта больше чем зелья");
        } else {
            console.log("успешная покупка");
        }
    }

    return (
        <section className='alchemy-shop'>
            <h2>Лавка алхимика</h2>
            <div className='alchemy-shop-cards'>
                {isLoading ? (
                    <>
                        <p>Из-за двери лавки слышен прерванный колольным звоном входной двери маниакальный смех...</p>
                        <p>...алхимик скоро подойдёт.</p>
                    </>
                ) : 
                items.map((item) => (
                    <ShopCard
                        key={item.id}
                        item={item}
                        onBuy={handleBuy}
                    />
                ))}
            </div>
        </section>
    )
}

function ShopCard({ item, onBuy }: ShopCardProps) {

    return (
        <article className='shop-item'>
            <h3 className='shop-item-name'>{item.name}</h3>
            <img src="#" alt="#" className='shop-item-img' />
            <p className='shop-item-price'>{item.price} серебра</p>
            <button className='shop-item-button' onClick={() => onBuy(item)}>Купить</button>
        </article>
    )
}