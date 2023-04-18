import { FeedsSlice } from "./feeds-slice";
import { ONftSlice } from "./nft-slice";
import { MessagesState } from "./messages-slice";

export interface IReduxState {
    nft: ONftSlice,
    feeds : FeedsSlice,
    messages: MessagesState
}
