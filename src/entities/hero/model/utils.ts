import { HeroState, HeroStore } from "./types";

export const createSnapshot = (state: HeroStore): HeroState => {
    const {
        history, buyItem, sellItem, undo, updateProfile, getGold,
        ...pureHeroState
    } = state;

    return pureHeroState;
};