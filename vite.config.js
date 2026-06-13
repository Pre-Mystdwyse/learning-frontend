import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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