<script setup>
  import Web3 from 'web3'
</script>
<template>
  <button
    @click="connectWallet"
    :disabled="isConnecting"
    class="metamask-button"
    :class="{ 'connecting': isConnecting }"
  >
    <div class="button-content">
      <div class="metamask-icon">🦊</div>
      <span class="button-text">
        {{ isConnecting ? 'Connecting...' : 'Login with MetaMask' }}
      </span>
    </div>
    <div class="shine-effect"></div>
  </button>
</template>

<script>
export default {
  name: 'ConnectWallet',
  props: {
    getNonce: {
      type: Function,
      default: null
    },
    onSign: {
      type: Function,
      default: null
    },
    onLogin: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      isConnecting: false
    }
  },
  methods: {
    async connectWallet() {
      if (this.isConnecting) return

      this.isConnecting = true

      try {
        // Check if MetaMask is installed
        if (typeof window.ethereum === 'undefined') {
          alert('MetaMask is not installed. Please install MetaMask to continue.')
          return
        }

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const address = accounts[0]
        const web3 = new Web3()

        this.getNonce().then((data) => {
          const { nonce, nonce_id } = data

          ethereum.request({
            method: "personal_sign",
            params: [web3.utils.fromUtf8(nonce), address],
          }).then((signature) => {
            this.onSign({ signature, nonce_id, address }).then(this.onLogin)
          })
        })

      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      } finally {
        this.isConnecting = false;
      }
    }
  }
}
</script>

<style scoped>
.metamask-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: linear-gradient(135deg, #f6851b 0%, #e2761b 50%, #cd6116 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(246, 133, 27, 0.3);
  overflow: hidden;
  min-width: 200px;
  outline: none;
}

.metamask-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(246, 133, 27, 0.4);
  background: linear-gradient(135deg, #ff8c1a 0%, #f6851b 50%, #e2761b 100%);
}

.metamask-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(246, 133, 27, 0.3);
}

.metamask-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.metamask-button.connecting {
  animation: pulse 2s infinite;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.metamask-icon {
  font-size: 24px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.button-text {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.shine-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.6s;
}

.metamask-button:hover .shine-effect {
  left: 100%;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(246, 133, 27, 0.3);
  }
  50% {
    box-shadow: 0 6px 20px rgba(246, 133, 27, 0.5);
  }
}

/* Focus styles for accessibility */
.metamask-button:focus {
  box-shadow: 0 4px 15px rgba(246, 133, 27, 0.3), 0 0 0 3px rgba(246, 133, 27, 0.2);
}

/* Responsive design */
@media (max-width: 480px) {
  .metamask-button {
    padding: 14px 24px;
    font-size: 15px;
    min-width: 180px;
  }

  .metamask-icon {
    font-size: 22px;
  }
}
</style>
