import { Box } from "@mui/material";
import "./banner.scss";

const Banner = () => {
  return (
    <Box
      className="banner-container"
      sx={{ fontSize: { xs: "18px", md: "24px" } }}
    >
      Proton Spin Jackpot @ 8,300 Tron! & 108 NFT's Staked in Mining Round 1
    </Box>
  );
};

export default Banner;
