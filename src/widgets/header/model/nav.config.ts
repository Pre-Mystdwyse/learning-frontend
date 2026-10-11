interface NavLinkItem {
    path:string,
    label: string,
}

export const NAV_LINKS: NavLinkItem[] = [
    { path: '/shop', label: 'Кузня' },
    { path: '/quests', label: 'Квесты' },
    { path: '/profile', label: 'Профиль' },
    { path: '/test', label: 'Тест' },
];