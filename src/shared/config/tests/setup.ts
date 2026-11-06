import '@testing-library/jest-dom/vitest'; //'то глобально подключит удобные проверки вроде toBeInTheDocument() для всех тестов
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
    cleanup();
})