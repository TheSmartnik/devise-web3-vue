import { createElementBlock as l, openBlock as r, normalizeClass as u, createElementVNode as s, toDisplayString as d } from "vue";
import m from "web3";
const f = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of t)
    n[o] = i;
  return n;
}, g = ["disabled"], p = { class: "button-content" }, h = { class: "button-text" }, _ = {
  name: "ConnectWallet",
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
      isConnecting: !1
    };
  },
  methods: {
    async connectWallet() {
      if (!this.isConnecting) {
        this.isConnecting = !0;
        try {
          if (typeof window.ethereum > "u") {
            alert("MetaMask is not installed. Please install MetaMask to continue.");
            return;
          }
          const t = (await window.ethereum.request({ method: "eth_requestAccounts" }))[0], n = new m();
          this.getNonce().then((o) => {
            const { nonce: i, nonce_id: a } = o;
            ethereum.request({
              method: "personal_sign",
              params: [n.utils.fromUtf8(i), t]
            }).then((c) => {
              this.onSign({ signature: c, nonce_id: a, address: t }).then(this.onLogin);
            });
          });
        } catch (e) {
          console.error("Error connecting to MetaMask:", e);
        } finally {
          this.isConnecting = !1;
        }
      }
    }
  }
}, C = /* @__PURE__ */ Object.assign(_, {
  setup(e) {
    return (t, n) => (r(), l("button", {
      onClick: n[0] || (n[0] = (...o) => t.connectWallet && t.connectWallet(...o)),
      disabled: t.isConnecting,
      class: u(["metamask-button", { connecting: t.isConnecting }])
    }, [
      s("div", p, [
        n[1] || (n[1] = s("div", { class: "metamask-icon" }, "🦊", -1)),
        s("span", h, d(t.isConnecting ? "Connecting..." : "Login with MetaMask"), 1)
      ]),
      n[2] || (n[2] = s("div", { class: "shine-effect" }, null, -1))
    ], 10, g));
  }
}), k = /* @__PURE__ */ f(C, [["__scopeId", "data-v-768dc9a9"]]), w = {
  install(e) {
    e.component("ConnectWallet", k);
  }
};
export {
  k as ConnectWallet,
  w as default
};
