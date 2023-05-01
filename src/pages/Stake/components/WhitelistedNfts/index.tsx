import { Box, Container, Typography, Table, TableBody } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state";
import WhitelistedItem from "./WhitelistedItem";
import "./whitelisted-nfts.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAddress, useWeb3Context } from "../../../../hooks";
import { getApproves, getMps, getStakedNftsFromUser, getWhilteLists, setApprove, stakeNft } from "store/slice/nft-slice";
import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";
import { useWeb3React } from "@web3-react/core";
import { success } from "store/slice/messages-slice";

interface IWhitelist {
  whiteLists : Array<[number, string, boolean, number, string, string]>
}

const WhitelistedNfts = ({whiteLists} : IWhitelist) => {
  const { account } = useWeb3React();
  const dispatch = useDispatch<AppDispatch>();

  async function setApproveNft(collection: string, id: number) {
    await dispatch(
      setApprove({
        collection,
        id,
        whiteLists
      })
    )
  }

  async function _stakeNft(collection: string, tokenId: number) {
    await dispatch(
      stakeNft({
        tokenId,
        address: collection,
      })
    )
  }

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
                {
                  whiteLists?.map((nft, index) => (
                    <WhitelistedItem key={index} id={nft[0]} address={nft[1]} approve={whiteLists[index][2]} mp={whiteLists[index][3]} click={() => { whiteLists[index][2] ? _stakeNft(nft[1], nft[0]) : setApproveNft(nft[1], nft[0]) }} />
                  ))
                }
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhitelistedNfts;
