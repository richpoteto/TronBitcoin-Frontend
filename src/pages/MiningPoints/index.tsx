import { Box, Container, Typography } from "@mui/material";
import PointLists from "./components/PointLists";
import Tokenomics from "./components/Tokenomics";
// import Chart from "./components/Chart";
import "./mining-points.scss";
import LogoImage from "assets/images/neutron-logo.png";
import SpinImage from "assets/images/spin1.png";

const MiningPoints = () => {
  return (
    <Box>
      <PointLists />
      <Box sx={{ backgroundColor: "common.black", pt: {xs: '28px', md: '48px'} }}>
        <Typography
          variant="h4"
          fontFamily="Audiowide"          
          textAlign="center"
          color="white"
          sx={{ fontSize: { xs: "24px", md: "40px" }, border: 1, maxWidth: {xs: '200px', md: '320px'}, mx: 'auto' }}
        >
          Tokenomics
        </Typography> 
        <Container
          maxWidth="xl"
          className="token-released-history"
          sx={{ py: "24px" }}
        >
          <Box component="img" src={LogoImage} alt="logo" sx={{width: '100px', height: '100px'}} />
          <Box sx={{maxWidth: {xs: '900px', md: '320px', lg: '360px'}, mt: {xs: '16px', md: '40px'}, mx: 'auto'}}>            
            <Typography color="white" fontFamily="Audiowide" fontSize="20px" mb="16px">
              The total supply of Proton will be 21,000,000. these tokens will be 
              released in yearly decreasing increments, as seen in the chart. The earlier you mine 
              the more you can earn.
            </Typography> 
            <Typography color="white" fontFamily="Audiowide" fontSize="20px" mb="4px">
              You will need Proton in order to use the upcoming Lottery Marketplace.
            </Typography>
          </Box>
          <Tokenomics />
          {/* <Chart /> */}
        </Container>
        <Container
          maxWidth="xl"
          className="token-released-history"
          sx={{ pb: "24px" }}
        >
          <Box component="img" src={LogoImage} alt="logo" sx={{width: '100px', height: '100px'}} />
          <Box sx={{maxWidth: {xs: '900px', md: '320px', lg: '360px'}, mt: {xs: '16px', md: '24px'}, mx: 'auto'}}>            
            <Typography color="#6164ff" fontFamily="Audiowide" fontSize="20px" mb="16px">
              The total supply of Neutron will be 21,000,000. These can only be mined by spinning a 7 
              on the Neutron Spin.
            </Typography> 
            <Typography color="#6164ff" fontFamily="Audiowide" fontSize="20px" mb="4px">
              You will need Neutron in order to mint our upcoming NFT collection or to have 
              share of 1% of all marketplace sales on the upcoming Lottery Marketplace!
            </Typography>            
          </Box>          
          <Box component="img" src={SpinImage} alt="logo" sx={{width: '300px', height: '300px'}} />
        </Container>
      </Box>      
      <Box sx={{ backgroundColor: "common.black" }}>
        <Container maxWidth="xl" sx={{ py: "32px", fontFamily: "Audiowide" }}>
          <Typography
            variant="h4"
            fontFamily="Audiowide"
            mb="20px"
            textAlign="center"
            color="white"
            sx={{ fontSize: { xs: "24px", md: "40px" }, border: 1, maxWidth: {xs: '360px', md: '560px'}, mx: 'auto' }}
          >
            Claim Fee Breakdown
          </Typography>          
          <Typography color="white" fontFamily="Audiowide" fontSize="18px" mb="4px">
            Claim Fee
          </Typography>
          <Typography color="secondary.main" fontFamily="Audiowide" mb="4px">
            Every 24-72 hours a user can claim there earned Proton tokens and earn Neutron Spins. There is
            fee of 2 Tron per NFT staked in order to claim. Each NFT you successfully claim 
            , earns you a Neutron Spin attempt.
          </Typography>
          <Typography color="error.main" fontFamily="Audiowide" mb="24px">
            *** If you do not claim your Proton tokens by 72 Hours you will
            stop mining Proton until you successfully claim. ***
          </Typography>
          <Typography color="white" fontSize="18px" fontFamily="Audiowide" mb="4px">
            Fee Breakdown
          </Typography>
          <Typography color="secondary.main" fontFamily="Audiowide" mb="16px">
            For each NFT claimed 1 tron is sent to the team and 1 tron is sent 
            to the Neutron Spin Jackpot. This jackpot will continue to 
            accumulate until the 1000th Neutron is mined. Then the jackpot amount is sent to the users wallet who 
            mined the 1000th Neutron.
            The jackpot will be reset and then will be triggered once the next 1000th Neutron is mined.
          </Typography>
          <Typography color="white" fontFamily="Audiowide" fontSize="18px">
            The Fee's collected by the team will allow us to keep the project running and continue to build. We will be adding to 
            swap liquidity, paying the running cost, artist and developers.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MiningPoints;
