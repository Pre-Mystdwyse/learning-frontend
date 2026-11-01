import { HeroState, HeroStore } from "./types";

export const createSnapshot = (state: HeroStore): HeroState => {
    const {
        history,
        actions,
        ...pureHeroState
    } = state;

    return pureHeroState;
};