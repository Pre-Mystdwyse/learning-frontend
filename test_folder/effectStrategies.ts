import { EffectType } from "./types"

export const REQUIRED_VALUE_EFFECTS: Record<EffectType, boolean> = {
    heal_percent: true,
    heal_raw: true,
    heal_full: false,
    damage: true,
}

type StrategyFn = ( currentHp: number, maxHp: number, value: number ) => number;

export const EFFECT_STRATEGIES: Record<EffectType, StrategyFn> = {
    heal_percent: (hp, maxHp, val) => hp + Math.round((maxHp * val) / 100),
    heal_raw: (hp, _, val) => hp + val,
    heal_full: (_, maxHp) => maxHp,
    damage: (hp, _, val) => hp - val,
}