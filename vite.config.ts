import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [
        vue({
          style: {
            filename: 'style.css'
          }
        })
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'DeviseWeb3Vue',
          fileName: (format) => `devise-web3-vue.${format === 'es' ? 'js' : 'umd.cjs'}`
        },
        rollupOptions: {
          external: ['vue', 'web3'],
          output: {
            globals: {
              vue: 'Vue',
              web3: 'Web3'
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                return 'style.css'
              }
              return assetInfo.name || 'assets/[name].[ext]'
            }
          }
        },
        cssCodeSplit: false
      }
    }
  }

  // Development mode
  return {
    plugins: [vue()],
    root: 'dev',
    publicDir: '../public'
  }
})
