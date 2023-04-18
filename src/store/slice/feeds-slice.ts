import { BigNumber, ethers } from "ethers";
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  JsonRpcProvider,
  StaticJsonRpcProvider,
} from "@ethersproject/providers";
import { RootState } from "../../state";
import { metamaskErrorWrap } from "helpers/metamask-error-wrap";
import { messages } from "../../constants/messages";
import { warning } from "./messages-slice";
import { setAll } from "../../helpers/set-all";
import nftABIs from "abis/nftABIs";
import whitelistNfts from "utils/whitelistNfts";
import { mainABIS } from "abis";

export interface FeedsSlice {
  feeds : Array<string>
}

const initialState : FeedsSlice = {
  feeds : []
};

const feeds = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    setFeeds(state, action) {
      setAll(state, [action.payload, ...state.feeds]);
    },
  },
  extraReducers: builder => {
  },
});

const baseInfo = (state: RootState) => state.feeds;

export default feeds.reducer;

export const { setFeeds } = feeds.actions;

export const getAppState = createSelector(baseInfo, (feeds) => feeds);