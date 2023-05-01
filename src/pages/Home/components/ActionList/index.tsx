import { Box, Typography } from "@mui/material";

import NeutronLogo from "assets/images/mobile_logo.png";

import "./action-list.scss";

const ActionList = () => {
  return (
    <Box className="action-list-desc">
      <Typography
        fontFamily="Audiowide"
        textAlign="center"        
        mt="8px"
        mb="20px"
        color="white"
        sx={{
          fontSize: { xs: "20px", md: "28px" }
        }}
      >
        Let's get full picture...
      </Typography>
      <Box color="white">
        <Typography fontSize="18px" fontFamily="Audiowide" className="action-list-desc-subtitle">
          Mining Points
        </Typography>
        <Typography fontSize="16px" color="rgb(169, 168, 166)">
          Each NFT can mine Neutron at different rates based off the cost to
          mint the NFT and in some collections, the rarity of each individual
          NFT in that collection.
        </Typography>
      </Box>
      <Box color="white" mt="24px">
        <Typography fontSize="18px" fontFamily="Audiowide" className="action-list-desc-subtitle">
          Tokenomics
        </Typography>
        <Typography fontSize="16px" color="rgb(169, 168, 166)">
          We have set up a token supply that is in complete control of the users
          and benefits people who help build Neutron in its early stages! We
          have a 10-year mining plan in order to mine all 21,000,000 Neutron
          tokens. Proton token mining is set up a little bit differently. Both
          Tokens can only be mined by staking NFT’s for time.
        </Typography>
      </Box>
      <Box color="white" mt="24px">
        <Typography fontSize="18px" fontFamily="Audiowide" className="action-list-desc-subtitle">
          Claiming and Withdraw Fees
        </Typography>
        <Typography fontSize="16px" color="rgb(169, 168, 166)">
          The fee's collected over time will allow for us to keep the project
          running and continue to build. We will be adding to swap liquidity,
          paying the running cost, artist and developers.
        </Typography>
      </Box>
      <Box color="white" mt="24px">
        <Typography fontSize="18px" fontFamily="Audiowide" className="action-list-desc-subtitle">
          Staking My NFT's
        </Typography>
        <Typography fontSize="16px" color="rgb(169, 168, 166)">
          Stake Popular Tron NFT's To Earn Neutron and Proton Tokens! Neutron
          tokens will be used in our upcoming Lottey Marketplace. Proton tokens
          will recieve a 1% weekly drop of any sale that occurs on the upcoming
          Lottey Marketplace and will be the only means to mint our upcoming
          NFT's.
        </Typography>
      </Box>
    </Box>
  );
};

export default ActionList;
