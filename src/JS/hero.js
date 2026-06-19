
if (!localStorage.getItem('hero')) {
    const initialHero = {
        name: 'Карбел',
        gold: 10000,
        inventory: []
    };
    localStorage.setItem('hero', JSON.stringify(initialHero));
}
export function getHero() {
    const data = localStorage.getItem('hero');
    return JSON.parse(data);
}

export function saveHero(heroData) {
    localStorage.setItem('hero', JSON.stringify(heroData));
}

let heroHistory = [];

export function setHeroHistory() {
    const heroData = getHero();
    if (getHero()) {
        heroHistory.push(structuredClone(heroData));
        console.log('занесены данные в историю: ', heroHistory);
    }
}

export function getHeroHistory() {
    console.log(heroHistory);
    return heroHistory.pop();
}

/*
{
    name: 'Кабрел',
    gold: 10000,
    inventory: [
        {
            name: '...',
            price: ...,
            img: "images/...",
            description: '...',
            id: ...
        }
    ]
}
*/