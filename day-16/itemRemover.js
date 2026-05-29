import { getHero, saveHero } from "./hero.js";
import { updateAllUI, animatedGold } from "./script.js";

const inventoryTable = document.querySelector('#inventory-list');

inventoryTable.addEventListener('click', (event) => {

    const hero = getHero();
    const searchLi = event.target.closest('li');

    if (!searchLi) return;

    const clickedId = searchLi.dataset.id;
    const foundItem = hero.inventory.find(item => String(item.id) === clickedId);
    console.log(foundItem);
    let startGold = hero.gold;
    hero.gold += foundItem.price/2;

    hero.inventory = hero.inventory.filter(item => String(item.id) !== clickedId);

    saveHero(hero);
    updateAllUI('inventory');
    animatedGold(hero.gold, startGold, 500);
});