import { BigNumber, ethers } from "ethers";
import { getAddresses, Networks } from "../../constants";
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

const BroadcastMessage = async (message: string) => {
  const ws = new WebSocket('ws://localhost:8001');

  ws.onopen = () => {
    ws.send(message);
    console.log(message, "from frontend to backend");
    ws.close();
  };

  ws.onerror = (error) => {
    console.error(`WebSocket error: ${error}`);
  };
};

interface IGetStatus {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export const getStatus = createAsyncThunk(
  "nft/getstatus",
  async ({
    networkID,
    provider,
  }: IGetStatus, { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []);
    const signer = provider1.getSigner();

    const mainContract = new ethers.Contract(
      addresses.MAIN_ADDRESS,
      mainABIS[0].abi,
      signer
    );

    const status = await mainContract.getStatus();

    return {
      status: {
        totalProtons: status.totalProtons.toNumber(),
        totalNewTrons: status.totalNewTrons.toNumber()
      }
    };
  }
);

interface IGetUserInfo {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  walletAddress: string
}

export const getUserInfo = createAsyncThunk(
  "nft/getuserinfo",
  async ({
    networkID,
    provider,
    walletAddress
  }: IGetUserInfo, { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []);
    const signer = provider1.getSigner();

    const mainContract = new ethers.Contract(
      addresses.MAIN_ADDRESS,
      mainABIS[0].abi,
      signer
    );

    const status = await mainContract.getUserInfo(walletAddress);

    return {
      userInfo: {
        newtrons: status.newtrons,
        protons: status.protons,
        spins: status.spins,
      }
    };
  }
);

interface IGetApproveSlice {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  nfts: [[number, string]];
}

export const getApproves = createAsyncThunk(
  "nft/getapproves",
  async ({
    networkID,
    provider,
    nfts
  }: IGetApproveSlice, { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []);
    const signer = provider1.getSigner();

    const approvedList = await Promise.all(nfts.map(async (nft) => {
      const id = nft[0];
      const address = nft[1];

      const nftContract = new ethers.Contract(
        address,
        nftABIs[whitelistNfts[address]].abi,
        signer
      );

      try {
        const approvedAddress = await nftContract.getApproved(id);
        return approvedAddress.toLowerCase() == addresses.MAIN_ADDRESS.toLowerCase();
      } catch (err: any) {
        console.error("Transaction error:", err);
        if (err.hasOwnProperty("error")) {
          alert("Error message:" + err.error.message);
        }
        return metamaskErrorWrap(err, dispatch);
      }
    }));
    //console.log(8888888);
    return { approve: approvedList };
  }
);

interface IGetMps {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  nfts: [[number, string]];
}

export const getMps = createAsyncThunk(
  "nft/getmps",
  async ({
    networkID,
    provider,
    nfts
  }: IGetMps, { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []);
    const signer = provider1.getSigner();

    const mainContract = new ethers.Contract(
      addresses.MAIN_ADDRESS,
      mainABIS[0].abi,
      signer
    );

    const mps = await Promise.all(nfts.map(async (nft) => {
      const id = nft[0];
      const address = nft[1];

      try {
        const mp = await mainContract.getMpOfToken(address, id);
        return mp.toNumber();
      } catch (err: any) {
        console.error("Transaction error:", err);
        if (err.hasOwnProperty("error")) {
          alert("Error message:" + err.error.message);
        }
        return metamaskErrorWrap(err, dispatch);
      }
    }));
    console.log(mps, 44444444444);
    return { mps };
  }
);

interface IsetApprove {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  id: Number;
  collection: string;
}

export const setApprove = createAsyncThunk(
  "nft/setApprove",

  async (
    {
      networkID,
      provider,
      id,
      collection,
    }: IsetApprove,
    { dispatch }
  ) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider1.getSigner();
    console.log(collection, addresses.MAIN_ADDRESS, id, 333333);

    const nftContract = new ethers.Contract(
      collection,
      nftABIs[whitelistNfts[collection]].abi,
      signer
    );

    let enterTx;
    try {
      enterTx = await nftContract.approve(addresses.MAIN_ADDRESS, id);
      await enterTx.wait();
      return;
    } catch (err: any) {
      console.error("Transaction error:", err);
      if (err.hasOwnProperty("error")) {
        alert("Error message:" + err.error.message);
      }
      return metamaskErrorWrap(err, dispatch);
    } finally {
    }
  }
);

interface IGetStakedNftFromUserSlice {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  walletAddress: string;
}

export const getStakedNftsFromUser = createAsyncThunk(
  "nft/getStakedNftsFromUser",
  async ({
    networkID,
    provider,
    walletAddress
  }: IGetStakedNftFromUserSlice, { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []);
    const signer = provider1.getSigner();

    const stakingContract = new ethers.Contract(addresses.MAIN_ADDRESS, mainABIS[0].abi, signer);

    const myStakedNfts = await stakingContract.getNftsFromUserAddress(walletAddress);

    const StakedNftsFromUser = myStakedNfts.map((nft: any, index: number) => {
      return {
        collection: nft.collection,
        tokenId: nft.tokenId.toNumber(),
        newtrons: nft.newtrons.toNumber(),
        protons: nft.protons.toNumber(),
        mp: nft.mp.toNumber(),
        stakedTimeStamp: nft.stakedTimeStamp.toNumber(),
        claimedTimeStamp: nft.claimedTimeStamp.toNumber(),
        claimable: nft.claimable
      }
    });
    console.log("222222222222222", StakedNftsFromUser);
    return { StakedNftsFromUser };
  }
);

interface IGetStakedNfts {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export const getStakedNfts = createAsyncThunk(
  "nft/getStakedNfts",
  async ({
    networkID,
    provider,
  }: IGetStakedNfts, { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []);
    const signer = provider1.getSigner();

    const stakingContract = new ethers.Contract(addresses.MAIN_ADDRESS, mainABIS[0].abi, signer);

    const allStakedNfts = await stakingContract.getAllNFTs();

    const StakedNfts = allStakedNfts.map((nft: any, index: number) => {
      return {
        collection: nft.collection,
        tokenId: nft.tokenId.toNumber(),
        newtrons: nft.newtrons.toNumber(),
        protons: nft.protons.toNumber(),
        mp: nft.mp.toNumber(),
        stakedTimeStamp: nft.stakedTimeStamp.toNumber(),
        claimedTimeStamp: nft.claimedTimeStamp.toNumber(),
        claimable: nft.claimable
      }
    })
    console.log("1111111111111111111", StakedNfts);
    return { StakedNfts };
  }
);

interface IstakeSlice {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  tokenId: Number;
  walletAddress: string,
  address: string;
}

export const stakeNft = createAsyncThunk(
  "stakeSlice/stakeSlice",

  async (
    {
      networkID,
      provider,
      tokenId,
      address,
      walletAddress
    }: IstakeSlice,
    { dispatch }
  ) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider1.getSigner();
    const mainContract = new ethers.Contract(
      addresses.MAIN_ADDRESS,
      mainABIS[0].abi,
      signer
    );
    let enterTx;
    try {
      enterTx = await mainContract.stakeNFT(address, tokenId);

      await enterTx.wait();

      BroadcastMessage(walletAddress + " staked tokenId " + tokenId + " at NFT collection " + address);
      return;
    } catch (err: any) {
      console.error("Transaction error:", err);
      if (err.hasOwnProperty("error")) {
        alert("Error message:" + err.error.message);
      }
      return metamaskErrorWrap(err, dispatch);
    }
  }
);

interface IunStakeSlice {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  tokenId: Number;
  address: string;
  walletAddress: string
}

export const unStakeNft = createAsyncThunk(
  "nft/unStakeSlice",

  async (
    {
      networkID,
      provider,
      tokenId,
      address,
      walletAddress
    }: IunStakeSlice,
    { dispatch }
  ) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider1.getSigner();

    const mainContract = new ethers.Contract(
      addresses.MAIN_ADDRESS,
      mainABIS[0].abi,
      signer
    );

    let enterTx;
    try {
      enterTx = await mainContract.unStakeNFT(address, tokenId);

      await enterTx.wait();

      BroadcastMessage(walletAddress + " unstaked tokenId " + tokenId + " at NFT collection " + address);
    
      return;
    } catch (err: any) {
      console.error("Transaction error:", err);
      if (err.hasOwnProperty("error")) {
        alert("Error message:" + err.error.message);
      }
      return metamaskErrorWrap(err, dispatch);
    }
  }
);

interface IclaimSlice {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  tokenId: Number;
  address: string;
  walletAddress: string
}

export const claimNft = createAsyncThunk(
  "nft/claimSlice",

  async (
    {
      networkID,
      provider,
      tokenId,
      address,
      walletAddress
    }: IclaimSlice,
    { dispatch }
  ) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider1.getSigner();

    const mainContract = new ethers.Contract(
      addresses.MAIN_ADDRESS,
      mainABIS[0].abi,
      signer
    );

    let enterTx;
    try {
      enterTx = await mainContract.claimNFT(address, tokenId, false);
      await enterTx.wait();

      const status = await mainContract.getStatus();

      if (status.message) {
        alert(status.message);
      } else {
        BroadcastMessage(walletAddress + " claimed " + status.claimedNewtrons + "Newtron tokens!");
      }
      return;
    } catch (err: any) {
      console.error("Transaction error:", err);
      if (err.hasOwnProperty("error")) {
        alert("Error message:" + err.error.message);
      }
      return metamaskErrorWrap(err, dispatch);
    }
  }
);

interface IclaimAll {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  walletAddress: string
}

export const claimAll = createAsyncThunk(
  "nft/claimAll",

  async (
    {
      networkID,
      provider,
      walletAddress
    }: IclaimAll,
    { dispatch }
  ) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider1.getSigner();

    const mainContract = new ethers.Contract(
      addresses.MAIN_ADDRESS,
      mainABIS[0].abi,
      signer
    );

    let enterTx;
    try {
      enterTx = await mainContract.claimNFTsFromUser(walletAddress);
      await enterTx.wait();

      const status = await mainContract.getStatus();

      if (status.claimedNewtrons) {
        BroadcastMessage(walletAddress + " claimed " + status.claimedNewtrons + "Newtron tokens!");
      }
      return;
    } catch (err: any) {
      console.error("Transaction error:", err);
      if (err.hasOwnProperty("error")) {
        alert("Error message:" + err.error.message);
      }
      return metamaskErrorWrap(err, dispatch);
    }
  }
);

interface IwithDraw {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  walletAddress: string
}

export const withDraw = createAsyncThunk(
  "nft/withDraw",

  async (
    {
      networkID,
      provider,
      walletAddress
    }: IwithDraw,
    { dispatch }
  ) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider1.getSigner();

    const mainContract = new ethers.Contract(
      addresses.MAIN_ADDRESS,
      mainABIS[0].abi,
      signer
    );

    let enterTx;
    try {
      enterTx = await mainContract.withDraw();
      await enterTx.wait();

      const status = await mainContract.getStatus();
      BroadcastMessage(walletAddress + " withdrawed " + status.claimedNewtrons + "Newtron tokens and " + status.claimedProtons + "Proton tokens!");
      return;
    } catch (err: any) {
      console.error("Transaction error:", err);
      if (err.hasOwnProperty("error")) {
        alert("Error message:" + err.error.message);
      }
      return metamaskErrorWrap(err, dispatch);
    }
  }
);

interface IspinNft {
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  value: number;
  walletAddress: string
}

export const spinNft = createAsyncThunk(
  "nft/spin",

  async (
    {
      networkID,
      provider,
      value,
      walletAddress
    }: IspinNft,
    { dispatch }
  ) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }

    const addresses = getAddresses(networkID);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    await provider1.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider1.getSigner();

    const mainContract = new ethers.Contract(
      addresses.MAIN_ADDRESS,
      mainABIS[0].abi,
      signer
    );

    let enterTx;
    try {
      enterTx = await mainContract.spin(value);
      await enterTx.wait();

      const status = await mainContract.getStatus();

      if (status.spin) {
        BroadcastMessage(walletAddress + " just hit the 7 on spin and get 1 proton token!");
        if (status.jackpot && status.message) {
          BroadcastMessage(status.message);
        }
      }
      return;
    } catch (err: any) {
      console.error("Transaction error:", err);
      if (err.hasOwnProperty("error")) {
        alert("Error message:" + err.error.message);
      }
      return metamaskErrorWrap(err, dispatch);
    }
  }
);

export interface ONftSlice {
  approve: Array<Boolean>,
  mps: Array<Number>,
  StakedNftsFromUser: Array<{ collection: string, tokenId: number, newtrons: number, protons: number, mp: number, stakedTimeStamp: number, claimedTimeStamp: number, claimable: boolean }>
  StakedNfts: Array<{ collection: string, tokenId: number, newtrons: number, protons: number, mp: number, stakedTimeStamp: number, claimedTimeStamp: number, claimable: boolean }>
  loading: Boolean;
  update: Boolean,
  userInfo: { newtrons: number, protons: number, spins : number },
  status : { totalNewTrons : number, totalProtons : number },
}

const initialState: ONftSlice = {
  approve: [],
  mps: [],
  StakedNftsFromUser: [],
  StakedNfts: [],
  loading: true,
  update: false,
  userInfo: { newtrons: 0, protons: 0, spins : 0 },
  status : {totalNewTrons : 0, totalProtons : 0}
};

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      /////////////
      .addCase(getStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getStatus.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })

      /////////////
      .addCase(getUserInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getUserInfo.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })

      ///////////
      .addCase(getApproves.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getApproves.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getApproves.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      /////////////
      .addCase(getMps.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMps.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getMps.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      /////////////
      .addCase(getStakedNftsFromUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getStakedNftsFromUser.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getStakedNftsFromUser.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      /////////////
      .addCase(getStakedNfts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getStakedNfts.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getStakedNfts.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      ////////////
      .addCase(setApprove.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setApprove.fulfilled, (state, action) => {
        state.update = !state.update;
        state.loading = false;
      })
      .addCase(setApprove.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })

      /////////
      .addCase(stakeNft.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(stakeNft.fulfilled, (state, action) => {
        state.update = !state.update;
        state.loading = false;
      })
      .addCase(stakeNft.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })

      //////////
      .addCase(unStakeNft.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(unStakeNft.fulfilled, (state, action) => {
        state.update = !state.update;
        state.loading = false;
      })
      .addCase(unStakeNft.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })

      /////////
      .addCase(claimNft.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(claimNft.fulfilled, (state, action) => {
        state.update = !state.update;
        state.loading = false;
      })
      .addCase(claimNft.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })

      ////////////
      .addCase(withDraw.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(withDraw.fulfilled, (state, action) => {
        state.update = !state.update;
        state.loading = false;
      })
      .addCase(withDraw.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      // ////////////
      // .addCase(withDraw.pending, (state, action) => {
      //   state.loading = true;
      // })
      // .addCase(withDraw.fulfilled, (state, action) => {
      //   state.update = !state.update;
      //   state.loading = false;
      // })
      // .addCase(withDraw.rejected, (state, { error }) => {
      //   state.loading = false;
      //   console.log(error);
      // })
  },
});

const baseInfo = (state: RootState) => state.nft;

export default nftSlice.reducer;

export const { fetchAppSuccess } = nftSlice.actions;

export const getAppState = createSelector(baseInfo, (nft) => nft);