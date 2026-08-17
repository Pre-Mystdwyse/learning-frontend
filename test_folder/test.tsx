import { create } from 'zustand'
import { HeroStats, AlchemyItem, ShopCardProps } from './types'
import { useState, useEffect } from 'react'
import { fetchAlchemyItems } from './api'

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

function AlchemyShop() {
    const [ items, setItems ] = useState<AlchemyItem[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    //пример использования .then
    // fetch('https://api.itupupuye.com/data')
    //     .then(response => response.json())
    //     .then(data => console.log(data));

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

    //старый вариант, который лучше не использовать
    // useEffect(() => {
    //     fetchAlchemyItems()
    //         .then((data) => {
    //             setItems(data);
    //             setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Ошибка при загрузке товаров: ", error);
    //             setIsLoading(false);
    //         });
    // }, []);

    const currentHp = useHeroStore((state) => state.hp);
    const currentGold = useHeroStore((state) => state.gold);

    const takeDamage = useHeroStore((state) => state.takeDamage);
    const healFull = useHeroStore((state) => state.healFull);
    const spendGold = useHeroStore((state) => state.spendGold);
    const healABit = useHeroStore((state) => state.healABit);

    const handleBuy = (item: AlchemyItem) => {
        if (currentGold < item.price) {
            let diff = item.price - currentGold;
            console.log("Не хватает серебра: ", diff)
            return;
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