import ReactDOM from "react-dom";
import React from "react";
import { HashRouter } from "react-router-dom";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "assets/styles/index.scss";
import App from "./App";
import store from "./state";
import ThemeProvider from "./theme";
import getLibrary from "./utils/getLibrary";
import ApplicationUpdater from "./state/application/updater";
import MulticallUpdater from "./state/multicall/updater";
import TransactionUpdater from "./state/transactions/updater";
import UserUpdater from "./state/user/updater";
import { NetworkContextName } from "./constants";
import { Web3ContextProvider } from "./hooks";

import reportWebVitals from "./reportWebVitals";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function Updaters() {
  return (
    <>
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  );
}

ReactDOM.render(
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Provider store={store}>
            <ThemeProvider>
              <HashRouter>
                <Updaters />
                <Web3ContextProvider>
                  <App />
                </Web3ContextProvider>
              </HashRouter>
            </ThemeProvider>
          </Provider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>,
  document.getElementById("root") as HTMLElement
);

reportWebVitals();