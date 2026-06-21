import { create } from 'zustand';
import { getHero, saveHero } from '../lib/hero';

/*экспорт хука. по правилам, все хуки нужно начинать с use
любой компонент, который вызовет useHeroStore(), автоматически
подпишется на изменение данных

create((set) => ({...})) функция create принимает в себя коллбек
(стрелочную функцию). zustand передаёт в этот компонент специальную
системную функцию set.
    set - это единственный инструмент, с помощью которого можно изменить
    данные внутри стора (store создаётся благодаря create). если попытаться
    изменить данные напрямую (например, state.hero.gold = 5), то реакт об
    этом не узнает и экран не перерисуется. функция set заставляет zustand
    обновить данные и дать команду реакту об перерисовки из-за изменённых данных
*/
export const useHeroStore = create((set) => ({
    //загрузка героя строго 1 раз из localStorage при запуске
    hero: getHero(),
    history: [],

    //метод для обновления героя с автоматическим сохранением в localStorage
    //сюда можно передать либо объект, либо функцию обновления
    setHero: (newHeroOrFn) => set((state) => {
        /*в этой переменной посредством typeof проверяем функция это или объект
        если объект:
            выполняется код после :
            updatedHero = newHeroOrFn
        если передавали стрелочную функцию (коллбек):
            выполняется код после ?
            updatedHero = newHeroOrFn(state.hero)
            в этом случае zustand берёт стрелочную функцию и вызывает её,
            передавая в качестве аргумента state.hero (самого актуального
            героя на данный момент)
        благодаря этой строке эта функция может обрабатывать как объекты,
        так и безопасные коллбеки
        */
        const updatedHero = typeof newHeroOrFn === 'function' ? newHeroOrFn(state.hero) : newHeroOrFn;
        saveHero(updatedHero); //синхронизация с localStorage
        //функция set в zustand ожидает объект с теми полями, которые нужно обновить
        return { hero: updatedHero };
    }),

    //метод для управления историей
    setHistory: (newHistoryOrFn) => set((state) => ({
        history: typeof newHistoryOrFn === 'function' ? newHistoryOrFn(state.history) : newHistoryOrFn
    })),
}));