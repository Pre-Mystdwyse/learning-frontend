import { useHeroStore } from "./heroStore";
import { useShallow } from "zustand/shallow";

/*
важное уточнение
есть 2 способа взятия данных из стора:
useHeroStore((state) => state.something)
и
useHeroStore.getState().something
первый использовать только внутри того, что должно само обновляться
эта строка подписывает на данные, при изменении которых придут новые данные

второй же вариант берёт данные 1 раз, новейшие на момент вызова
использовать надо только в функциях подсчёта чего-либо
*/

export const useHeroActions = () => useHeroStore((state) => state.actions);

export const useHeroMainCardData = () => useHeroStore(useShallow((state) => ({
    name: state.name,
    heroImgSrc: state.heroImgSrc,
    heroImgDesc: state.heroImgDesc,
})));

export const useProfileFormData = () => useHeroStore(useShallow((state) => ({
    name: state.name,
    age: state.age,
    mood: state.mood,
    element: state.element,
    extra: state.extra,
    info: state.info,
})));