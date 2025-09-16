# devise-web3-vue
A Vue component for Web3 wallet authentication with `devise` and [devise-web3](https://github.com/TheSmartnik/devise-web3)

## Installation
```
npm install devise-web3-vue
```
or
```
yarn add devise-web3-vue
```

## Usage
1. Import component
```js
import { ConnectWallet } from 'devise-web3-vue'
import 'devise-web3-vue/style.css'
```

2. Create 3 functions

`getNonce` -- function that fetches nonce through API

`onSign` -- function that posts credentials through API

`onLogin` -- any effects after login

3. Use component
```vue
<ConnectWallet :getNonce="getNonce" :onSign="onSign" :onLogin="onLogin"/>
```
## License
MIT



