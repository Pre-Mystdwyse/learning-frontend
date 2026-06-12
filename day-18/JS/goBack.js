import { getHero, saveHero, setHeroHistory, getHeroHistory } from "./hero.js";
import { updateAllUI } from "./uiUpdater.js";
import { animatedGold } from "./animations.js";

export function goBack() {

    document.querySelector('#cancel-btn').addEventListener('click', (event) => {
        const history = getHeroHistory();
        const heroData = getHero();
        if (history) {
            const startGold = history.gold;
            const targetGold = heroData.gold;
            animatedGold(targetGold, startGold, 200);
            saveHero(history);
            updateAllUI('all');
        }
        else {
            console.log('история пуста');
        }
    });
}