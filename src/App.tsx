import { Route, Switch, Redirect } from "react-router-dom";
import Header from "components/Header";
import Home from "pages/Home";
import Stake from "pages/Stake";
import MiningPoints from "pages/MiningPoints";
import store, { AppDispatch } from "./state";
import { Provider } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { useWalletModalToggle } from "state/application/hooks";
import { ReactNotifications } from 'react-notifications-component';
import socketIO from 'socket.io-client';
import 'react-notifications-component/dist/theme.css';
import { IReduxState } from "store/slice/state.interface";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNftsCount, getRareNfts, getStakedNfts, getStakedNftsFromUser, getStatus, getUserInfo, getWhilteLists } from "store/slice/nft-slice";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from "@mui/material";

const socket = socketIO('http://localhost:8001');

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [messages, setMessages] = useState<Array<string>>([]);
  const { active, account } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();

  const loading: Boolean = useSelector<IReduxState, Boolean>(
    (state) => state.nft.loading
  )

  const update = useSelector<IReduxState, { approved: Boolean, staked: Boolean, claimed: Boolean, withdrawed: Boolean, spined : Boolean }>(state => {
    return state.nft.update
  })

  async function getNftsAndCount(walletAddress: string) {
    console.log(4444);
    let result1 = await dispatch(getStakedNfts({}));
    if (result1.meta.requestStatus === 'fulfilled') {
      console.log(3333);
        let result2 = await dispatch(getStakedNftsFromUser({ walletAddress }));
        if (result2.meta.requestStatus === 'fulfilled') {
          console.log(1111);
          let result3 = await dispatch(getWhilteLists({ account: walletAddress }));
          if (result3.meta.requestStatus === 'fulfilled') {
            dispatch(getNftsCount({}));
          }
        }
    }
  }

  const _getUserInfo = useCallback(() => {
    dispatch(getUserInfo({ walletAddress: account }))
  }, [account]);

  useEffect(() => {
    const prevMessages = localStorage.getItem("messages");
    if (prevMessages) {
      setMessages(JSON.parse(prevMessages));
    }
  }, []);

  useEffect(() => {
    socket.on('News', (data: any) => {
      const { message } = data;
      let prevMessages: string[] = JSON.parse(localStorage.getItem("messages") || "[]");
      if (prevMessages.length > 10) prevMessages.pop();
      localStorage.setItem("messages", JSON.stringify([message, ...prevMessages]));
      setMessages(prevMessages => {
        if (prevMessages.length > 10) prevMessages.pop();
        return [message, ...prevMessages];
      });
    });
  }, [socket]);

  useEffect(() => {
    if (!active) {
      toggleWalletModal();
    }
  }, [active]);

  useEffect(() => {
    if (account) {
      getNftsAndCount(account);
    }
  }, [account, update.staked]);

  useEffect(() => {
    if (account) {
      _getUserInfo();
    }
  }, [account, update.claimed, update.withdrawed, update.spined]);

  useEffect(() => {
    if (account) {
      dispatch(getStatus({}));
    }
  }, [account, update.claimed, update.staked])

  useEffect(() => {
    if (account) {
      dispatch(getStakedNftsFromUser({ walletAddress: account }));
    }
  }, [update.claimed]);

  return (
    <>
      <Provider store={store}>
        <ReactNotifications />
        <Header />
        <div style={{ pointerEvents: loading ? "none" : "auto" }}>
          {loading &&
            <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex : 3 }}>
              <CircularProgress size={200} style={{ color: 'rgba(0, 255, 0, 0.5)' }} />
              <div>
              <Typography variant="h2" style={{color : 'black', fontFamily : 'bold', textAlign : 'center'}}>Wait...</Typography>
              </div>
            </Box>
          }
          <div style={{position : "relative", display : 'flex', flexWrap : 'wrap', height : 'max-content'}}>
            <div style={{ position: "absolute", width: "100%", height: "100%", background: loading ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0)" }} />
            <div>
              <Switch>
                <Route exact path="/" component={() => <Home messages={messages} />} />
                <Route exact path="/stake" component={() => <Stake messages={messages} />} />
                <Route exact path="/mining-points" component={MiningPoints} />
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
