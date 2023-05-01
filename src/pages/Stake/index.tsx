import { Box } from "@mui/material";
import Mining from "./components/Mining";
import StakeInfo from "./components/StakeInfo";
import StakedNfts from "./components/StakedNfts";
import WhitelistedNfts from "./components/WhitelistedNfts";
import { IReduxState } from "store/slice/state.interface";
import { useWeb3React } from "@web3-react/core";
import "./stake.scss";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch } from "state";
import { getNftsCount, getStakedNftsFromUser, getWhilteLists } from "store/slice/nft-slice";

interface IStake {
  messages : Array<string>
}

const Stake = ({messages} : IStake) => {
  const stakedCounts = useSelector<IReduxState, number>(state => {
    if (state.nft) {
      return state.nft.stakedCounts;
    }
    return 0;
  });

  const StakedNftsFromUser = useSelector<IReduxState, Array<{ collection: string, nftName : string, tokenId: number, newtrons: number, protons: number, mp: number, stakedTimeStamp: number, claimedTimeStamp: number, claimable: boolean }>>(state => {
    if (state.nft) {
      return state.nft.StakedNftsFromUser;
    }
    return [];
  });

  const whiteLists = useSelector<IReduxState, Array<[number, string, boolean, number, string, string]>>(
    (state) => state.nft.whiteLists
  );

  return (
    <Box>
      <Mining messages={messages}/>
      <StakeInfo globalNfts={stakedCounts} userNfts={StakedNftsFromUser.length} />
      <StakedNfts nftsOfUser={StakedNftsFromUser}/>
      <WhitelistedNfts  whiteLists={whiteLists}/>
    </Box>
  );
};

export default Stake;
