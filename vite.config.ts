import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, './src'),
        },
    },

    build: {
        rolldownOptions: {
            input: {
                main: resolve(import.meta.dirname, 'index.html')
            },
        },
    },

    test: {
        environment: 'jsdom',    // Говорим Vitest использовать наш фейковый браузер
        setupFiles: './src/shared/config/tests/setup.ts', // Файл, который запустится ДО всех тестов
    },
});