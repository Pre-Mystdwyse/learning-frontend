import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        rolldownOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                arsenal: resolve(__dirname, 'arsenal.html'),
                quests: resolve(__dirname, 'quest.html')
            },
        },
    },
});