import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const __dirname = path.resolve()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: [
      {
        find: '@public',
        replacement: path.resolve(__dirname, 'public')
      }, 
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname,'src/pages')
      },
      {
        find: '@server',
        replacement: path.resolve(__dirname,'src/server')
      },
      {
        find: '@routes',
        replacement: path.resolve(__dirname,'src/routes')
      },
      {
        find: '@database',
        replacement: path.resolve(__dirname,'src/database')
      }
    ]
  }
})
