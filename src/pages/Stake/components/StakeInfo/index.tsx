import { Box, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context, useAddress } from "hooks";
import { AppDispatch } from "state";
import "./stake-info.scss";
import { IReduxState } from "store/slice/state.interface";
import { getStakedNfts, getStakedNftsFromUser, getStatus } from "store/slice/nft-slice";
import { useEffect } from "react";

const StakeInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { provider, chainID, connected, connect } = useWeb3Context();

  const address = useAddress();

  const stakedNfts = useSelector<IReduxState, Array<{ collection: string, tokenId: number, newtrons: number, protons: number, mp: number, stakedTimeStamp: number, claimedTimeStamp: number, claimable: boolean }>>(state => {
    if (state.nft) {
      return state.nft.StakedNfts;
    }
    return [];
  });

  const stakedNftsFromUser = useSelector<IReduxState, Array<{ collection: string, tokenId: number, newtrons: number, protons: number, mp: number, stakedTimeStamp: number, claimedTimeStamp: number, claimable: boolean }>>(state => {
    if (state.nft) {
      return state.nft.StakedNftsFromUser;
    }
    return [];
  });

  const status = useSelector<IReduxState, { totalNewTrons: number, totalProtons: number }>(state => {
    return state.nft.status
  });

  const update = useSelector<IReduxState, Boolean>(state => {
    return state.nft.update
  })

  const realStakedNfts = stakedNfts.map((nft, index) => {
    if (parseInt(nft.collection)) {
      return 1;
    } else {
      return 0;
    }
  }
  )
    .filter((nft) => nft !== 0);

  async function _getStakedNfts() {
    await dispatch(
      getStakedNfts({
        provider,
        networkID: chainID,
      })
    )
  }

  async function _getStakedNftsFromUser() {
    await dispatch(
      getStakedNftsFromUser({
        provider,
        networkID: chainID,
        walletAddress : address
      })
    )
  }

  async function _getStatus() {
    await dispatch(
      getStatus({
        provider,
        networkID: chainID
      })
    )
  }

  useEffect(() => {
    _getStakedNfts();
    _getStakedNftsFromUser();
    _getStatus();
  }, [connect]);

  useEffect(() => {
      _getStakedNfts();
      _getStakedNftsFromUser();
      _getStatus();
  }, [update]);

  return (
    <Box
      sx={{ backgroundColor: "primary.main" }}
      className="stake-info-container"
    >
      <Container maxWidth="xl" sx={{ py: "24px" }}>
        <Box px="24px">
          <Typography
            fontFamily="Audiowide"
            mb="32px"
            sx={{ fontSize: { xs: "24px", md: "28px" } }}
          >
            Stake your Tron NFT's
          </Typography>
          <Typography fontSize="18px" mb="16px">
            Earn Neutron and Proton tokens by staking your Tron NFT’s! Staked
            NFT’s have a chance of winning over 10,000 Tron depending on the
            size of the Jackpot!
          </Typography>
          <Typography fontSize="18px" mb="16px">
            Minimum staking peirod 7 days, with no maximum duration. Each NFT
            Mines Neutron at different rates. (see mining points chart)
          </Typography>
          <Typography fontSize="18px" mb="16px">
            Each NFT accumulates Neutron tokens over time and must be claimed
            once every 72 hours or they will stop mining for you.
          </Typography>
          <Typography fontSize="18px" mb="16px">
            You earn Proton Spins every time you sucessfully claim your mined
            Neutron. 1 Proton Spin for every NFT you have staked.
          </Typography>
          <Typography fontSize="18px" mb="32px">
            There is a Fee of 2 Tron per NFT staked in order to claim mined
            Neutron. (See fees on Mining Points Page)
          </Typography>
          <Box className="card-info">
            <Box className="card-info-item">
              <Typography className="card-info-item-title">
                Global NFTs Staked
              </Typography>
              <Typography
                className="card-info-item-value"
                color="secondary.main"
              >
                {realStakedNfts.length}
              </Typography>
            </Box>
            <Box className="card-info-item">
              <Typography className="card-info-item-title">
                You've staked
              </Typography>
              <Typography
                className="card-info-item-value"
                color="secondary.main"
              >
                {stakedNftsFromUser.length} NFT's
              </Typography>
            </Box>
            <Box className="card-info-item">
              <Typography className="card-info-item-title">
                Total Neutron Mined
              </Typography>
              <Typography
                className="card-info-item-value"
                color="secondary.main"
              >
                {status.totalNewTrons}
              </Typography>
            </Box>
            <Box className="card-info-item">
              <Typography className="card-info-item-title">
                Total Proton Mined
              </Typography>
              <Typography
                className="card-info-item-value"
                color="secondary.main"
              >
                {status.totalProtons}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StakeInfo;
