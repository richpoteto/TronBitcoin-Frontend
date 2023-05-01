import { Box, Typography } from "@mui/material";

import useResponsive from "../../../../hooks/useResponsive";
import { isMobile } from 'react-device-detect';
import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";

const Banner = () => {
  const isMobile = useResponsive("down", "sm");

  const stakedCounts = useSelector<IReduxState, number>(state => {
    if (state.nft) {
      return state.nft.stakedCounts;
    }
    return 0;
  });

  return (
    <Box      
      display="flex"
      justifyContent="space-between"
      width={isMobile? "100%" : "500px"}
      margin="0 auto"
      sx={{ fontSize: { xs: "18px", md: "24px" } }}
    >
      <Box
        display="flex"
        flexDirection="column"
        borderRadius="8px"
        border="1px solid rgba(255, 255, 255, 0.12)"
        p="8px 16px"
        width="49%"
        fontFamily="Montserrat Medium"
        sx={{
          background: "rgb(20, 18, 15)"
        }}
      >
        <Typography
          color="rgb(236, 232, 227)"
          fontSize="16px"
        >
          Proton Spin Jackpot
        </Typography>
        <Typography
          color="rgb(228, 179, 120)"
          fontSize="20px"
        >
          0 Tron
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        borderRadius="8px"
        border="1px solid rgba(255, 255, 255, 0.12)"
        p="8px 16px"
        width="49%"
        fontFamily="Montserrat Medium"
        sx={{
          background: "rgb(20, 18, 15)"
        }}
      >
        <Typography
          color="rgb(236, 232, 227)"
          fontSize="16px"
        >
          NFT's Staked
        </Typography>
        <Typography
          color="rgb(228, 179, 120)"
          fontSize="20px"
        >
          {stakedCounts}
        </Typography>
      </Box>
      {/* Proton Spin Jackpot @ 8,300 Tron! & 108 NFT's Staked in Mining Round 1 */}
    </Box>
  );
};

export default Banner;
