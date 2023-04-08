import { useEffect, useState } from "react";
import { useWeb3Context, useAddress } from "../../hooks";
import { DEFAULD_NETWORK } from "../../constants";

import "./connect-menu.scss";
import "./web3-status.scss";

export default function Web3Status() {
  const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork } = useWeb3Context();
  const [isConnected, setConnected] = useState(connected);
  const address = useAddress();


  let buttonText = "Connect Wallet";
  let clickFunc: any = connect;
  let buttonStyle = {};

  if (isConnected) {
      buttonText = `${address.slice(0, 4)}...${address.slice(38, 42)}`;
      clickFunc = disconnect;
  }

  if (isConnected && providerChainID !== DEFAULD_NETWORK) {
      buttonText = "Wrong network";
      buttonStyle = { backgroundColor: "rgb(255, 67, 67)" };
      clickFunc = () => {
          checkWrongNetwork();
      };
  }

  useEffect(() => {
      setConnected(connected);
  }, [web3, connected]);

  return (
      <div className="connect-button" style={buttonStyle} onClick={clickFunc}>
          <p>{buttonText}</p>
      </div>
  );
}
