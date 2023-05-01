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
import { Redirect, useHistory } from "react-router-dom";

interface IHome {
  messages : Array<string>
}

const Home = ({messages} : IHome) => {
  const history = useHistory();
  const stakedNfts = useSelector<IReduxState, Array<{collection : string, nftName : string, tokenId : number, newtrons : number, protons : number, mp : number, stakedTimeStamp : number, claimedTimeStamp : number, claimable : boolean}>>(state => {
    if (state.nft) {
      return state.nft.StakedNfts;
    }
    return [];
  });

  let currentNfts = stakedNfts.slice().sort((a, b) => a.stakedTimeStamp - b.stakedTimeStamp);

  let rareNfts = stakedNfts.slice().sort((a, b) => a.mp - b.mp);
  if (rareNfts.length > 10) rareNfts = rareNfts.slice(0, 10);

  return (
    <Box>
      <Container maxWidth="xl" sx={{ py: "24px" }}>
        <Banner />
        <Typography
          variant="h2"
          textAlign="center"
          fontFamily="Audiowide"
          color="white"
          maxWidth="720px"
          sx={{
            fontSize: { xs: "20px", md: "28px" },
            mt: "36px",
            mb: "24px",
            mx: 'auto'
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
          <Button 
            variant="contained"
            sx={{
              background: "rgb(29, 26, 21)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "8px",
              height: "44px",
              color: "rgb(236, 232, 227)",
              padding: "16px 26px",
              lineHeight: "normal",
              "&:hover": { background: "rgb(43, 42, 42)" }
            }}
            onClick={() => history.push('/stake')}
          >
            Stake NFT's
          </Button>
        </Box>
        <ActionFeed rareNfts = {rareNfts} currentNfts={currentNfts} messages={messages}/>
        <ActionList /> 
      </Container>
      <AboutUs />
      <GrandDesign />
      <RoadMap />
      <TicketManagement />
    </Box>
  );
};

export default Home;
