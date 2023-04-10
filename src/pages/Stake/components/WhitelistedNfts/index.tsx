import { Box, Container, Typography, Table, TableBody } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state";
import WhitelistedItem from "./WhitelistedItem";
import "./whitelisted-nfts.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAddress, useWeb3Context } from "../../../../hooks";
import { getApproves, getMps, getStakedNftsFromUser, setApprove, stakeNft } from "store/slice/nft-slice";
import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";

const WhitelistedNfts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [nftData, setNftData] = useState([]);

  const { connect } = useWeb3Context();
  const walletAddress = useAddress();

  const { provider, chainID, connected } = useWeb3Context();

  const approveNft1 = useSelector<IReduxState, Array<Boolean>>(state => {
    if (state.nft) {
      return state.nft.approve;
    }
    return [];
  });

  const mps = useSelector<IReduxState, Array<Number>>(state => {
    if (state.nft) {
      return state.nft.mps;
    }
    return [];
  });

  const update = useSelector<IReduxState, Boolean>(state => {
    return state.nft.update
  })

  async function getApproveNFTs(nfts: any) {
    await dispatch(
      getApproves({
        provider,
        networkID: chainID,
        nfts
      })
    )
  }

  async function getMpOfNfts(nfts: any) {
    await dispatch(
      getMps({
        provider,
        networkID: chainID,
        nfts
      })
    )
  }

  async function setApproveNft(collection: string, id: number) {
    await dispatch(
      setApprove({
        provider,
        networkID: chainID,
        collection,
        id
      })
    )
  }

  async function _stakeNft(address: string, tokenId: number) {
    await dispatch(
      stakeNft({
        networkID: chainID,
        provider,
        tokenId,
        address,
        walletAddress
      })
    )
  }

  const getAvailableNfts = () => {
    axios.get(`http://localhost:8001/api/nft/ids?address=${walletAddress}`).then((res) => {
      if (res.data) {
        getApproveNFTs(res.data);
        getMpOfNfts(res.data);
        setNftData(res.data);
      }
    });
  };

  useEffect(() => {
    if (walletAddress) {
      getAvailableNfts();
    }
  }, [connect]);

  useEffect(() => {
    if (walletAddress) {
      getAvailableNfts();
    }
  }, [update]);

  return (
    <Box sx={{ backgroundColor: "common.black" }}>
      <Container maxWidth="xl" sx={{ py: "24px" }}>
        <Box
          className="whitelisted-nfts-content"
          sx={{
            backgroundColor: "secondary.light",
          }}
        >
          <Box mb="24px">
            <Typography
              fontFamily="Audiowide"
              color="white"
              sx={{ fontSize: { xs: "24px", md: "28px" } }}
            >
              Available Whitelisted NFT's
            </Typography>
          </Box>
          <Box className="table-container">
            <Table sx={{ minWidth: 450 }}>
              <TableBody>
                {approveNft1 && mps && nftData?.map((nft, index) => (
                  <WhitelistedItem key={index} id={nft[0]} address={nft[1]} approve={approveNft1[index]} mp={mps[index]} click={() => { approveNft1[index] ? _stakeNft(nft[1], nft[0]) : setApproveNft(nft[1], nft[0]) }} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhitelistedNfts;
