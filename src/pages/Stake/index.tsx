import { Box } from "@mui/material";
import Mining from "./components/Mining";
import StakeInfo from "./components/StakeInfo";
import StakedNfts from "./components/StakedNfts";
import WhitelistedNfts from "./components/WhitelistedNfts";
import "./stake.scss";

const Stake = () => {
  return (
    <Box>
      <Mining />
      <StakeInfo />
      <StakedNfts />
      <WhitelistedNfts />
    </Box>
  );
};

export default Stake;
