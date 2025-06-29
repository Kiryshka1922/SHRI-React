import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Импортируйте плагин

export default defineConfig({
  plugins: [react()], 
  test: {
    globals: true,
    environment: 'jsdom',
  },
});