
export const btn = document.querySelectorAll('.btn-trade');
export const pageGold = document.querySelector('#gold-count');
export const inventory = document.querySelector('#inventory-list');
export const itemsPrices = document.querySelectorAll('.price');
export const inventoryTable = document.querySelector('#inventory-list');

export let isAnimating = false;

export function setAnimating(value) {
    isAnimating = value;
}