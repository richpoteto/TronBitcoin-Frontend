import { Box, Container, Typography, Button } from "@mui/material";
import { AppDispatch } from "state";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ActionFeed from "./components/ActionFeed";
import Banner from "./components/Banner";
import ActionList from "./components/ActionList";
import AboutUs from "./components/AboutUs";
import GrandDesign from "./components/GrandDesign";
import RoadMap from "./components/RoadMap";
import TicketManagement from "./components/TicketManagement";
import { useWeb3React } from "@web3-react/core";
import { IReduxState } from "store/slice/state.interface";
import { getStakedNfts } from "store/slice/nft-slice";


interface IHome {
  messages : Array<string>
}

const Home = ({messages} : IHome) => {
  const stakedNfts = useSelector<IReduxState, Array<{collection : string, tokenId : number, newtrons : number, protons : number, mp : number, stakedTimeStamp : number, claimedTimeStamp : number, claimable : boolean}>>(state => {
    if (state.nft) {
      return state.nft.StakedNfts;
    }
    return [];
  });

  // const stakedNfts = useSelector<IReduxState, Array<{collection : string, tokenId : number, newtrons : number, protons : number, mp : number, stakedTimeStamp : number, claimedTimeStamp : number, claimable : boolean}>>(state => {
  //   if (state.nft) {
  //     return state.nft.stak;
  //   }
  //   return [];
  // });

  let recentNfts = stakedNfts.slice().sort((a, b) => a.stakedTimeStamp - b.stakedTimeStamp);

  let rareNfts = stakedNfts.slice().sort((a, b) => a.mp - b.mp);
  if (rareNfts.length > 10) rareNfts = rareNfts.slice(0, 10);

  return (
    <Box sx={{ backgroundColor: "common.black" }}>
      <Container maxWidth="xl" sx={{ py: "24px" }}>
        <Banner />
        <Typography
          variant="h2"
          textAlign="center"
          fontFamily="Audiowide"
          color="white"
          sx={{
            fontSize: { xs: "20px", md: "28px" },
            mt: "36px",
            mb: "24px",
          }}
        >
          Stake Popular Tron NFT's to Mine Neutron & Proton Tokens!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "16px",
            mb: "36px",
          }}
        >
          <Button variant="contained" color="primary">
            Stake NFT's
          </Button>
        </Box>
        <ActionFeed nfts = {rareNfts} messages={messages}/>
        <ActionList nfts = {recentNfts}/>
      </Container>
      <AboutUs />
      <GrandDesign />
      <RoadMap />
      <TicketManagement />
    </Box>
  );
};

export default Home;
