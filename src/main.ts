import type { App } from 'vue'
import ConnectWallet from './components/ConnectWallet.vue'

// Export the component
export { ConnectWallet }

// Plugin install function
export default {
  install(app: App) {
    app.component('ConnectWallet', ConnectWallet)
  }
}
