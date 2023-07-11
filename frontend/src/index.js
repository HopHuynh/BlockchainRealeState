import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store, { persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider, theme } from "@chakra-ui/react";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import IndexHandler from "./components/Children/indexApiChildren";
import PropertyHandler from "./Children/PropertyChildren";

const { chains, provider } = configureChains(
  [polygonMumbai, mainnet],
  [
    alchemyProvider({ apiKey: "9MFVlO2p9rDZ9L3NDEhCBQEgwl_JfQPk" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Stream Hub",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      // coolMode //<<<<<<<< coolMode
    >
      <IndexHandler>
        <BrowserRouter>
          <PropertyHandler>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider theme={theme}>
                <App />
                <ToastContainer ></ToastContainer>
                </ChakraProvider>
              </PersistGate>
            </Provider>
          </PropertyHandler>
        </BrowserRouter>
      </IndexHandler>
    </RainbowKitProvider>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
