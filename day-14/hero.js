
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