import { FeedsSlice } from "./feeds-slice";
import { ONftSlice } from "./nft-slice";

export interface IReduxState {
    nft: ONftSlice,
    feeds : FeedsSlice
}
