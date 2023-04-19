import { ShataTestnet } from "../../constants";
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../../state";
import { metamaskErrorWrap } from "helpers/metamask-error-wrap";
import { setAll } from "../../helpers/set-all";
import io from "socket.io-client";
import whitelistNfts from "utils/whitelistNfts";
import tronWeb from 'tronweb';
import { notification } from "utils/notification";

declare var window: any

const BroadcastMessage = async (message: string) => {
  var socket = io("http://localhost:8001");
  socket.emit("message", { message });
};

const getTronAddress = (address: string) => {
  return tronWeb.address.fromHex(address);
}

interface IGetNftsCount { }

export const getNftsCount = createAsyncThunk(
  'nft/getnftscount',
  async ({ }: IGetNftsCount) => {
    let mainContract;
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));
      }
    }
    const counts = await mainContract.stakedCounts().call();

    return {
      stakedCounts: counts.toNumber()
    }
  })

interface IWhiteList {
  account: any;
}

export const getWhilteLists = createAsyncThunk(
  'nft/whitelists',
  async ({ account }: IWhiteList) => {
    let nfts: any[] = [], mainContract;

    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));

        for (let i = 0; i < whitelistNfts.length; i++) {
          let nft = await window.tronWeb.contract().at(tronWeb.address.toHex(whitelistNfts[i]));

          let nft_counts = await nft.balanceOf(account).call();

          let temp: any[] = [];

          for (let j = 0; j < nft_counts.toNumber(); j++) {
            console.log(i, j, "Staking...");
            let tmptokenID = await nft.tokenOfOwnerByIndex(account, j).call();
            let nftid = tronWeb.toDecimal(tmptokenID);
            let nfturl = await nft.tokenURI(nftid).call();
            let nfturi = `https://ipfs.io/ipfs/${nfturl.slice(7, 53)}/${nfturl
              }.png`;

            const approvedAddress = await nft.getApproved(nftid).call();
            const isApprove = tronWeb.address.fromHex(approvedAddress).toLowerCase() == ShataTestnet.MAIN_ADDRESS.toLowerCase();
            const mp = await mainContract.getMpOfToken(whitelistNfts[i], nftid).call();

            temp.push([nftid, whitelistNfts[i], isApprove, mp.toNumber(), nfturi]);
          }
          nfts.push(temp.sort((a, b) => a[0] - b[0]));
        }
      }
    }

    return {
      whiteLists: nfts.flat()
    }
  }
)

interface IGetStatus {
}

export const getStatus = createAsyncThunk(
  "nft/getstatus",
  async ({
  }: IGetStatus) => {
    let mainContract: any;

    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));
      }
    }

    const status = await mainContract.status().call();

    return {
      status: {
        totalProtons: status.totalProtons.toNumber(),
        totalNewTrons: status.totalNewTrons.toNumber()
      }
    };
  }
);

interface IGetUserInfo {
  walletAddress: any
}

export const getUserInfo = createAsyncThunk(
  "nft/getuserinfo",
  async ({
    walletAddress
  }: IGetUserInfo) => {
    let mainContract: any;

    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));
      }
    }

    const status = await mainContract.ownerInfo(walletAddress).call();

    return {
      userInfo: {
        newtrons: status.newtrons.toNumber(),
        protons: status.protons.toNumber(),
        spins: status.spins.toNumber(),
      }
    };

  }
);

interface IGetApproveSlice {
  nfts: any[];
}

export const getApproves = createAsyncThunk(
  "nft/getapproves",
  async ({
    nfts
  }: IGetApproveSlice, { dispatch }) => {
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const approvedList = await Promise.all(
          nfts.map(async (nft) => {
            const id = nft[0];
            const address = nft[1];

            let nftContract = await window.tronWeb.contract().at(tronWeb.address.toHex(address));

            try {
              const approvedAddress = await nftContract.getApproved(id).call();
              return tronWeb.address.fromHex(approvedAddress).toLowerCase() == ShataTestnet.MAIN_ADDRESS.toLowerCase();
            } catch (err: any) {
              console.error("Transaction error:", err);
              if (err.hasOwnProperty("error")) {
                alert("Error message:" + err.error.message);
              }
              return metamaskErrorWrap(err, dispatch);
            }
          }
          )
        );
        return { approve: approvedList };
      }
    }
  }
);

interface IGetMps {
  nfts: Array<[number, string, string]>;
}

export const getMps = createAsyncThunk(
  "nft/getmps",
  async ({ nfts }: IGetMps) => {
    let mainContract: any;

    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));
      }
    }

    let mps: any[] = [];
    for (let i = 0; i < nfts.length; i++) {
      const mp = await mainContract.getMpOfToken(nfts[i][1], nfts[i][0]).call();
      mps.push(mp.toNumber());
    }
    return { mps };
  }
);

interface IsetApprove {
  id: Number;
  collection: string;
  whiteLists: Array<[number, string, boolean, number, string]>
}

export const setApprove = createAsyncThunk(
  "nft/setApprove",

  async (
    {
      id,
      collection,
      whiteLists
    }: IsetApprove,
    { dispatch }
  ) => {
    let nftContract;
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        nftContract = await window.tronWeb.contract().at(tronWeb.address.toHex(collection));
      }
    }

    let enterTx, receipt = null, i = 0;
    try {
      enterTx = await nftContract.approve(
        ShataTestnet.MAIN_ADDRESS, id
      ).send({ feeLimit: 100000000 });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      while (receipt === 'REVERT' || receipt == null) {
        i++;
        if (window.tronWeb) {
          const transaction = await window.tronWeb.trx.getTransaction(enterTx);
          receipt = transaction.ret[0].contractRet;
        }
        if (receipt === 'REVERT') {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
          if (i == 10) {
            notification({ title: "Approving failed!", type: "danger" });
            throw new Error("");
          }
        }
      }

      let copyArray: any[] = [];

      for (let i = 0; i < whiteLists.length; i++) {
        const id = whiteLists[i][0];
        const address = whiteLists[i][1];

        let nftContract = await window.tronWeb.contract().at(tronWeb.address.toHex(address));
        const approvedAddress = await nftContract.getApproved(id).call();
        let element = [...whiteLists[i]];
        element[2] = tronWeb.address.fromHex(approvedAddress).toLowerCase() == ShataTestnet.MAIN_ADDRESS.toLowerCase();
        copyArray.push(element);
      }
      notification({ title: "Successfully approved!", type: "success" });
      return { whiteLists: copyArray }
    } catch (err: any) {
      throw err;
    }
  }
);

interface IGetStakedNftFromUserSlice {
  walletAddress: any;
}

export const getStakedNftsFromUser = createAsyncThunk(
  "nft/getStakedNftsFromUser",
  async ({
    walletAddress
  }: IGetStakedNftFromUserSlice) => {
    let mainContract: any;

    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));
      }
    }

    const indexes = await mainContract.getNftIndexesFromUserAddress(walletAddress).call();
    console.log(indexes, 11111);
    let StakedNftsFromUser: any[] = [];

    for (let i = 0; i < indexes.length; i++) {
      console.log(indexes, 22222);
      const nft = await mainContract.StakedNfts(indexes[i].toNumber()).call();
      StakedNftsFromUser.push({
        collection: nft.collection,
        tokenId: nft.tokenId.toNumber(),
        newtrons: nft.newtrons.toNumber(),
        protons: nft.protons.toNumber(),
        mp: nft.mp.toNumber(),
        stakedTimeStamp: nft.stakedTimeStamp.toNumber(),
        claimedTimeStamp: nft.claimedTimeStamp.toNumber(),
        claimable: nft.claimable
      });
    }

    return { StakedNftsFromUser };
  }
);

interface IGetRareNfts { }

export const getRareNfts = createAsyncThunk(
  "nft/getRareNfts",
  async ({ }: IGetRareNfts) => {
    let mainContract: any;

    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));
      }
    }

    let rareNfts: any[] = [], check = true;

    const count = await mainContract.stakedCounts().call();
    console.log("countcountcount");
    let index;
    if (count.toNumber()) {
      console.log(count.toNumber(), 9999);
      for (let i = 0; i < 10; i++) {
        index = await mainContract.rareNfts(i).call();
        index = index.toNumber();
        console.log(index, 8989898989);
        if (index == 0 && !check) {

        } else {
          const nft = await mainContract.StakedNfts(index).call();
          if (nft.mp.toNumber()) {
            rareNfts.push({
              collection: nft.collection,
              tokenId: nft.tokenId.toNumber(),
              newtrons: nft.newtrons.toNumber(),
              protons: nft.protons.toNumber(),
              mp: nft.mp.toNumber(),
              stakedTimeStamp: nft.stakedTimeStamp.toNumber(),
              claimedTimeStamp: nft.claimedTimeStamp.toNumber(),
              claimable: nft.claimable
            });
          }
        }
        if (index == 0) check = false;
      }
    }

    return { rareNfts };
  }
);

interface IGetStakedNfts {
}

export const getStakedNfts = createAsyncThunk(
  "nft/getStakedNfts",
  async ({
  }: IGetStakedNfts,) => {
    let mainContract: any;
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));
      }
    }

    const stakedRegistry = await mainContract.stakedRegistry().call();

    let allStakedNfts: any[] = []; let j = 0;

    for (let i = stakedRegistry.toNumber() - 1; i >= 0; i--) {
      const nft = await mainContract.StakedNfts(i).call();

      if (nft.mp.toNumber() && j < 10) {
        allStakedNfts.push(nft);
        j++;
      }
    }

    const StakedNfts = allStakedNfts.map((nft: any) => {
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

    return { StakedNfts };
  }
);

interface IstakeSlice {
  tokenId: Number;
  walletAddress: any,
  address: string;
}

export const stakeNft = createAsyncThunk(
  "stakeSlice/stakeSlice",
  async (
    {
      tokenId,
      address,
      walletAddress
    }: IstakeSlice,
    { }
  ) => {
    let mainContract;
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));
      }
    }

    let enterTx, receipt = null, i = 0;

    try {
      enterTx = await mainContract.stakeNFT(address, tokenId).send({ feeLimit: 1000000000 });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      while (receipt === 'REVERT' || receipt == null) {
        i++;
        if (window.tronWeb) {
          const transaction = await window.tronWeb.trx.getTransaction(enterTx);
          receipt = transaction.ret[0].contractRet;
        }
        if (receipt === 'REVERT') {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
          if (i == 10) {
            notification({ title: "Insert your mp first!", type: "danger" });
            throw new Error("");
          }
        }
      }

      notification({ title: "Successfully staked!", type: "success" });
      const tronWallet = getTronAddress(walletAddress), tronCollection = getTronAddress(address);
      BroadcastMessage(`${tronWallet.slice(0, 4)}...${tronWallet.slice(-4)}` + " staked tokenId " + tokenId + " at NFT collection " + `${tronCollection.slice(0, 4)}...${tronCollection.slice(-4)}`);
      return;
    } catch (err: any) {
      console.log(err);
      throw err;
      //notification({ title: "Something went wrong! Try again!", type: "danger" });
    }
  }
);

interface IunStakeSlice {
  tokenId: Number;
  address: string;
  walletAddress: any
}

export const unStakeNft = createAsyncThunk(
  "nft/unStakeSlice",

  async (
    {
      tokenId,
      address,
      walletAddress
    }: IunStakeSlice,
    { }
  ) => {
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));

        let enterTx, receipt = null, i = 0;
        try {
          enterTx = await mainContract.unStakeNFT(address, tokenId).send({
            from: address,
            feeLimit: 1000000000,
          });

          await new Promise((resolve) => setTimeout(resolve, 2000));

          while (receipt === 'REVERT' || receipt == null) {
            i++;
            const transaction = await window.tronWeb.trx.getTransaction(enterTx);
            if (window.tronWeb) {
              receipt = transaction.ret[0].contractRet;
            }
            if (receipt === 'REVERT') {
              await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
              if (i == 10) {
                notification({ title: "Early Unstake!", type: "danger" });
                throw new Error("");
              }
            }
          }

          notification({ title: "Successfully unstaked!", type: "success" });
          const tronWallet = getTronAddress(walletAddress), tronCollection = getTronAddress(address);
          BroadcastMessage(`${tronWallet.slice(0, 4)}...${tronWallet.slice(-4)}` + " unstaked tokenId " + tokenId + " at NFT collection " + `${tronCollection.slice(0, 4)}...${tronCollection.slice(-4)}`);
          return;
        } catch (err: any) {
          console.log(err);
          throw err;
          //notification({ title: "Something went wrong! Try again!", type: "danger" });
        }
      }
    }

  }
);

interface IclaimSlice {
  tokenId: Number;
  address: string;
  walletAddress: any
}

export const claimNft = createAsyncThunk(
  "nft/claimSlice",

  async (
    {
      tokenId,
      address,
      walletAddress
    }: IclaimSlice,
    { dispatch }
  ) => {
    let mainContract;
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));
      }
    }

    let enterTx, receipt = null, i = 0;
    try {
      enterTx = await mainContract.claimNFT(address, tokenId, false).send({ feeLimit: 100000000 });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      while (receipt === 'REVERT' || receipt == null) {
        i++;
        if (window.tronWeb) {
          const transaction = await window.tronWeb.trx.getTransaction(enterTx);
          receipt = transaction.ret[0].contractRet;
        }
        if (receipt === 'REVERT') {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
          if (i == 10) {
            notification({
              title: "Claim failed!",
              message: "You wanna claim too early or can't claim anymore for this nft!",
              type: "danger"
            });
            throw new Error("");
          }
        }
      }

      const status = await mainContract.status().call();
      notification({ title: "Successfully claimed!", type: "success" });
      const tronWallet = getTronAddress(walletAddress);
      if (status.claimedNewtrons) {
        BroadcastMessage(`${tronWallet.slice(0, 4)}...${tronWallet.slice(-4)}` + " claimed " + status.claimedNewtrons + "Newtron tokens!");
      }
      return;
    } catch (err: any) {
      console.log(err);
      throw err;
      //notification({ title: err, type: "danger" });
    }
  }
);

interface IclaimAll {
  walletAddress: any
}

export const claimAll = createAsyncThunk(
  "nft/claimAll",

  async (
    {
      walletAddress
    }: IclaimAll,
    { dispatch }
  ) => {
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));

        let enterTx, receipt = null, i = 0;
        try {
          enterTx = await mainContract.claimNFTsFromUser(walletAddress).send({ feeLimit: 100000000 });

          await new Promise((resolve) => setTimeout(resolve, 2000));

          while (receipt === 'REVERT' || receipt == null) {
            i++;
            if (window.tronWeb) {
              const transaction = await window.tronWeb.trx.getTransaction(enterTx);
              receipt = transaction.ret[0].contractRet;
            }
            if (receipt === 'REVERT') {
              await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
              if (i == 10) {
                notification({ title: "No nfts to claim! All the tokens are not claimable or early claimed!", type: "danger" });
                throw new Error("");
              }
            }
          }

          const status = await mainContract.status().call();

          const tronWallet = getTronAddress(walletAddress);
          if (status.claimedNewtrons) {
            notification({ title: "Successfully claimed for all nfts!", type: "success" });
            BroadcastMessage(`${tronWallet.slice(0, 4)}...${tronWallet.slice(-4)}` + " claimed " + status.claimedNewtrons + "Newtron tokens!");
          } else {
            notification({ title: "Nothing claimed!", type: "warning" });
          }
          return;
        } catch (err: any) {
          console.log(err);
          throw err;
          //notification({ title: err, type: "danger" });
        }
      }
    }

  }
);

interface IwithDraw {
  walletAddress: any
}

export const withDraw = createAsyncThunk(
  "nft/withDraw",

  async (
    {
      walletAddress
    }: IwithDraw,
    { dispatch }
  ) => {
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));

        let enterTx, receipt = null, i = 0;
        try {
          enterTx = await mainContract.withDraw().send({ feeLimit: 100000000 });

          await new Promise((resolve) => setTimeout(resolve, 2000));

          while (receipt === 'REVERT' || receipt == null) {
            i++;
            if (window.tronWeb) {
              const transaction = await window.tronWeb.trx.getTransaction(enterTx);
              receipt = transaction.ret[0].contractRet;
            }
            if (receipt === 'REVERT') {
              await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
              if (i == 10) {
                notification({ title: "Nothing withdrawed!", type: "danger" });
                throw new Error("");
              }
            }
          }

          const status = await mainContract.status().call();
          notification({ title: "Successfully withdrawed!", type: "success" });

          const tronWallet = getTronAddress(walletAddress);
          BroadcastMessage(`${tronWallet.slice(0, 4)}...${tronWallet.slice(-4)}` + " withdrawed " + status.claimedNewtrons + "Newtron tokens and " + status.claimedProtons + "Proton tokens!");
          return;
        } catch (err: any) {
          console.log(err);
          throw err;
          //notification({ title: err, type: "success" });
        }
      }
    }

  }
);

interface IspinNft {
  walletAddress: any
}

export const spinNft = createAsyncThunk(
  "nft/spin",

  async (
    {
      walletAddress
    }: IspinNft,
    { dispatch }
  ) => {
    if (window) {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const mainContract = await window.tronWeb.contract().at(tronWeb.address.toHex(ShataTestnet.MAIN_ADDRESS));

        let enterTx, receipt = null, i = 0;
        try {
          enterTx = await mainContract.spin().send({ feeLimit: 100000000 });

          await new Promise((resolve) => setTimeout(resolve, 2000));

          while (receipt === 'REVERT' || receipt == null) {
            i++;
            if (window.tronWeb) {
              const transaction = await window.tronWeb.trx.getTransaction(enterTx);
              receipt = transaction.ret[0].contractRet;
            }
            if (receipt === 'REVERT') {
              await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
              if (i == 10) {
                notification({ title: "You don't have spin opportunities!", type: "danger" });
                throw new Error("");
                //return;
              }
            }
          }

          const status = await mainContract.status().call();
          const tronWallet = getTronAddress(walletAddress);

          if (status.spin) {
            notification({ title: "You hit the 7, and get 1 proton token!", type: "success" });
            BroadcastMessage(`${tronWallet.slice(0, 4)}...${tronWallet.slice(-4)}` + " just hit the 7 on spin and get 1 proton token!");
            if (status.jackpot) {
              notification({ title: "Jackpot Success!", type: "success" });
              BroadcastMessage(`${tronWallet.slice(0, 4)}...${tronWallet.slice(-4)}` + "just jackpoted!");
            }
          } else {
            notification({ title: "Sorry, you didn't hit the 7, so can't get proton token! Try it again!", type: "warning" });
          }
          console.log(status.spinNumber.toNumber(), 888);
          return {
            spinNumber: status.spinNumber.toNumber(),
            spinSuccess: true,
            
          };
        } catch (err: any) {
          console.log(err);
          throw err;
          //notification({ title: err, type: "danger" });
        }
      }
    }
  }
);

export interface ONftSlice {
  approve: Array<Boolean>,
  mps: Array<Number>,
  stakedCounts: number,
  StakedNftsFromUser: Array<{ collection: string, tokenId: number, newtrons: number, protons: number, mp: number, stakedTimeStamp: number, claimedTimeStamp: number, claimable: boolean }>
  StakedNfts: Array<{ collection: string, tokenId: number, newtrons: number, protons: number, mp: number, stakedTimeStamp: number, claimedTimeStamp: number, claimable: boolean }>
  rareNfts: Array<{ collection: string, tokenId: number, newtrons: number, protons: number, mp: number, stakedTimeStamp: number, claimedTimeStamp: number, claimable: boolean }>
  loading: Boolean;
  update: { approved: Boolean, staked: Boolean, claimed: Boolean, withdrawed: Boolean, spined : Boolean };
  userInfo: { newtrons: number, protons: number, spins: number },
  status: { totalNewTrons: number, totalProtons: number },
  whiteLists: Array<[number, string, boolean, number, string]>,
  spinNumber: number,
  spinSuccess: boolean
}

const initialState: ONftSlice = {
  approve: [],
  mps: [],
  stakedCounts: 0,
  StakedNftsFromUser: [],
  StakedNfts: [],
  rareNfts: [],
  loading: false,
  update: { approved: false, staked: false, claimed: false, withdrawed: false, spined : false },
  userInfo: { newtrons: 0, protons: 0, spins: 0 },
  status: { totalNewTrons: 0, totalProtons: 0 },
  whiteLists: [],
  spinNumber: 0,
  spinSuccess: true
};

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    setNftVariables(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      /////////////
      .addCase(getNftsCount.pending, (state, action) => {
        state.loading = true;

      })
      .addCase(getNftsCount.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getNftsCount.rejected, (state, { error }) => {
        state.loading = false;
      })

      /////////////
      .addCase(getWhilteLists.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getWhilteLists.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getWhilteLists.rejected, (state, { error }) => {
        state.loading = false;
      })

      /////////////
      .addCase(getRareNfts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRareNfts.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getRareNfts.rejected, (state, { error }) => {
        state.loading = false;
      })

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
        state.update.approved = !state.update.approved;
        setAll(state, action.payload);
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
        state.update.staked = !state.update.staked;
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
        state.update.staked = !state.update.staked;
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
        state.update.claimed = !state.update.claimed;
        state.loading = false;
      })
      .addCase(claimNft.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })

      /////////
      .addCase(claimAll.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(claimAll.fulfilled, (state, action) => {
        state.update.claimed = !state.update.claimed;
        state.loading = false;
      })
      .addCase(claimAll.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })


      ////////////
      .addCase(withDraw.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(withDraw.fulfilled, (state, action) => {
        state.update.withdrawed = !state.update.withdrawed;
        state.loading = false;
      })
      .addCase(withDraw.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })

      ////////////
      .addCase(spinNft.pending, (state, action) => {
        //state.loading = true;
      })
      .addCase(spinNft.fulfilled, (state, action) => {
        //state.loading = false;
        state.update.spined = !state.update.spined;
        setAll(state, action.payload);
      })
      .addCase(spinNft.rejected, (state, { error }) => {
        //state.loading = false;
        state.spinNumber = 0;
        state.spinSuccess = false;
        console.log(error);
      })
  },
});

const baseInfo = (state: RootState) => state.nft;

export default nftSlice.reducer;

export const { setNftVariables } = nftSlice.actions;

export const getAppState = createSelector(baseInfo, (nft) => nft);