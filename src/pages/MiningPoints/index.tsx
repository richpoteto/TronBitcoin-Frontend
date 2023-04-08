import { Box, Container, Typography } from "@mui/material";
import PointLists from "./components/PointLists";
import Tokenomics from "./components/Tokenomics";
import Chart from "./components/Chart";
import "./mining-points.scss";

const MiningPoints = () => {
  return (
    <Box>
      <PointLists />
      <Box sx={{ backgroundColor: "common.black" }}>
        <Container
          maxWidth="xl"
          className="token-released-history"
          sx={{ py: "24px" }}
        >
          <Tokenomics />
          <Chart />
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "#b7b7b7" }}>
        <Container maxWidth="xl" sx={{ py: "24px", position: "relative" }}>
          <Typography
            color="#ff0000"
            fontSize="24px"
            fontWeight="600"
            textAlign="center"
            sx={{
              position: "absolute",
              top: "24px",
              display: { xs: "none", md: "block" },
            }}
          >
            Proton (PRO)
          </Typography>
          <Typography
            color="#ff0000"
            mb="8px"
            textAlign="center"
            sx={{ fontSize: { xs: "20px", md: "24px" } }}
          >
            [21,000,000.00 Total Supply] (Precision 2)
          </Typography>
          <Typography
            color="#ff0000"
            fontWeight="600"
            textAlign="center"
            sx={{ fontSize: { xs: "24px", md: "28px" } }}
          >
            21,000,000.00 PRO
          </Typography>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "common.black" }}>
        <Container maxWidth="xl" sx={{ py: "32px" }}>
          <Typography
            variant="h4"
            fontFamily="Audiowide"
            mb="20px"
            textAlign="center"
            color="white"
            sx={{ fontSize: { xs: "24px", md: "40px" } }}
          >
            Claim & Withdraw Fees
          </Typography>
          <Typography color="white" mb="24px">
            The fee's collected over time will allow for us to keep the project
            running and continue to build. We will be adding to swap liquidity,
            paying the running cost, artist and developers.
          </Typography>
          <Typography color="primary.light" fontSize="18px" mb="4px">
            Claim Fee
          </Typography>
          <Typography color="secondary.main" mb="4px">
            Every 48 hours user can claim there earned NeuTron tokens. There is
            a fee of 2 Tron per NFT staked. With a max fee of 50 Tron (25 NFT's)
            After That every other NFT is staked and claimed for free. Each NFT
            you successfully claim for gets you a Lucky Spin, however there is a
            max amount of Lucky Spins you can get every 2 days which is 25 per
            Tron address.
          </Typography>
          <Typography color="error.main" mb="24px">
            *** If you do not claim your NeuTron tokens by 72 Hours you will
            stop mining NeuTron until you successfully claim. ***
          </Typography>
          <Typography color="primary.light" fontSize="18px" mb="4px">
            Withdraw Fee
          </Typography>
          <Typography color="secondary.main">
            You are able to send your claimed Neutron tokens to your Tron
            address once every 7 days for safe keeping. We charge 10 Tron to do
            this. You do not need to do this every 7 day your claimed amount
            will just keep accumulating as long as you are claiming every 2
            days.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MiningPoints;
