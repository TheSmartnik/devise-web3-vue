<script setup lang="ts">
import ConnectWallet from '../src/components/ConnectWallet.vue'

const getNonce = () => {
  return new Promise((resolve, reject) => {
    console.log("Nonce Resolved")
    return resolve({ nonce: "bb6be3a2fe42775356376baf229f1129" }) // random hex
  })
}
const onSign = ({ signature, nonce_id, address }: { signature: string, nonce_id: string, address: string }) => {
  return new Promise<string>((resolve, reject) => {
    console.log(`On Sign Resolved: ${address}; ${signature}`)
    return resolve("UserToken")
  })
}

const onLogin = (response) => {
  console.log(`User Login: ${response}`)
}
</script>

<template>
  <div id="app">
    <h1>Connect Wallet Demo</h1>

    <ConnectWallet
      :getNonce="getNonce"
      :onSign="onSign"
      :onLogin="onLogin"
    />
  </div>
</template>

<style>
#app {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

#app > * {
  margin-bottom: 20px;
}
</style>
