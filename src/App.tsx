import { Route, Switch, Redirect } from "react-router-dom";
import Header from "components/Header";
import Home from "pages/Home";
import Stake from "pages/Stake";
import MiningPoints from "pages/MiningPoints";
import { useWeb3Context } from "./hooks";
import store, { AppDispatch} from "./state";
import { useDispatch, Provider } from "react-redux";
import { useEffect, useState, useCallback } from "react";
// import { loadGameDetails } from "./store/slices/game-slice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { connect, provider, hasCachedProvider, chainID, connected } = useWeb3Context();
  const [walletChecked, setWalletChecked] = useState(false);

  async function LoadDetails(whichDetails: string) {
    let loadProvider = provider;

    if (whichDetails === "app") {
      // loadApp(loadProvider);
    }
  }

  const loadApp = useCallback(
    loadProvider => {
    //   dispatch(loadGameDetails({ networkID: chainID, provider: loadProvider}));
    },
    [connected],
  );
  useEffect(() => {
    if (hasCachedProvider()) {
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      setWalletChecked(true);
    }
  }, []);

  useEffect(() => {
    if (connected) {
      LoadDetails("app");
    }
  }, [connected]);

  useEffect(() => {
    if (walletChecked) {
      LoadDetails("app");
    }
  }, [walletChecked]);

  return (
    <>
      <Provider store={store}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/stake" component={Stake} />
        <Route exact path="/mining-points" component={MiningPoints} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      </Provider>
    </>
  );
}

export default App;
