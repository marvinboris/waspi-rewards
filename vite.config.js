import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/ts/app.tsx"],
            refresh: true,
        }),
        react(),
    ],
    build: {
        sourcemap: true,
    },
});
