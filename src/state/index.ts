import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";

import application from "./application/reducer";
import { updateVersion } from "./global/actions";
import user from "./user/reducer";
import transactions from "./transactions/reducer";
import multicall from "./multicall/reducer";
import nftReducer from "../store/slice/nft-slice";
import feedsReducer from "../store/slice/feeds-slice";
import messagesReducer from "../store/slice/messages-slice";

const PERSISTED_KEYS: string[] = ["user", "transactions", "lists"];

const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    multicall,
    nft : nftReducer,
    feeds : feedsReducer,
    messages : messagesReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  preloadedState: load({ states: PERSISTED_KEYS }),
});

store.dispatch(updateVersion());

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
