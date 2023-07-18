import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/moderna/',
    build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            proyectos: resolve(__dirname, 'proyectos.html'),
            nosotros: resolve(__dirname, 'nosotros.html'),
            blog: resolve(__dirname, 'blog.html'),
            proyecto: resolve(__dirname, 'proyecto.html'),
            contacto: resolve(__dirname, 'contacto.html'),
            refiere: resolve(__dirname, 'refiere.html'),
            // Puntos de entrada para los archivos JavaScript
            // jquery: 'src/jquery.js',
            // index: 'src/index.js',
          },
        }
    },
});
// import sassPlugin from 'vite-plugin-sass'
