import { describe, it, expect } from 'vitest';
import { createSnapshot } from './utils';
import { HeroStore } from './types';

describe('createSnapshot utility', () => {
    it('должен возвращать чистый стейт без полей history и actions', () => {
        const mockState = {
            name: 'тестовый герой',
            gold: 999,
            history: [{ name: 'какой-то герой', gold: 0 }],
            actions: { addGold: () => {} }
        } as unknown as HeroStore;

        const result = createSnapshot(mockState);

        expect((result as any).history).toBeUndefined();
        expect((result as any).actions).toBeUndefined();
        expect(result.name).toBe('тестовый герой');
        expect(result.gold).toBe(999);
    })
})