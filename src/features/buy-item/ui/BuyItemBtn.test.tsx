import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BuyItemBtn } from './BuyItemBtn';
import { useHeroStore } from '@/entities/hero';

describe('BuyItemBtn UI', () => {
    it('должен показывать ошибку, если не хватает золота', async () => {
        const user = userEvent.setup();

        const mockItemData = {
            id: 'some_id',
            price: 500,
        };

        useHeroStore.setState({ gold: 0 });

        render(<BuyItemBtn itemId={mockItemData.id} itemPrice={mockItemData.price} />);

        const button = screen.getByRole('button', { name: /Купить/i });

        await user.click(button);

        expect(await screen.findByText('нет золота!')).toBeInTheDocument();
    });

    it('не должен показывать ошибку, т.к. золота достаточно', async () => {
        const user = userEvent.setup();

        const mockItemData = {
            id: "some_id",
            price: 500,
        };

        useHeroStore.setState({ gold: 500 });

        render(<BuyItemBtn itemId={mockItemData.id} itemPrice={mockItemData.price} />);

        const button = screen.getByRole('button', { name: /Купить/i });

        await user.click(button);

        expect(screen.queryByText('нет золота!')).toBeNull();

        expect(useHeroStore.getState().gold).toBe(0);
    })
});