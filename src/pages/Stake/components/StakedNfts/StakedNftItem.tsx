import { Box, Typography, TableRow, TableCell, Button } from "@mui/material";
import { AppDispatch } from "state";
import { useDispatch } from "react-redux";
import { useAddress, useWeb3Context } from "../../../../hooks";
import { useWeb3React } from "@web3-react/core";
import NftImage from "assets/images/item/1 snowman epiphany.png";
import { claimNft, unStakeNft } from "store/slice/nft-slice";
import { getDayFromTimestamp, getHourFromTimestamp } from "utils/getDate";
import { useEffect, useState } from "react";

type StakedNftItemProps = {
  stakedDate: number,
  address: string,
  id: number,
  mp: number,
  claimable: boolean,
  newtrons: number
}

const StakedNftItem = ({ address, id, mp, claimable, stakedDate, newtrons }: StakedNftItemProps) => {
  const [walletAddress, setWallet] = useState("");
  const [disable, setDisable] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { account } = useWeb3React();

  const day = getDayFromTimestamp(stakedDate);
  const hour = getHourFromTimestamp(stakedDate);

  useEffect(() => {
    if (account && account !== "") {
      setWallet(account);
    }
  }, [account]);

  async function _unStakeNft() {
    await dispatch(
      unStakeNft({
        address,
        walletAddress,
        tokenId: id
      })
    )
  }

  async function _claimNft() {
    let result = await dispatch(
      claimNft({
        tokenId: id,
        address,
        walletAddress
      })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      setDisable(true);
    }
  }

  useEffect(() => {
    if (disable) {
      setTimeout(() => {
        setDisable(false);
      }, 4 * 60 * 1000);
    }
  }
    , [disable])

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: "common.black",
          "&:not(:first-of-type)": {
            borderTop: "3px solid #22274f",
          },
        }}
      >
        <TableCell sx={{ borderBottom: "none", width: "140px" }}>
          <Box
            component="img"
            src={NftImage}
            sx={{ width: "100%", aspectRatio: "1", borderRadius: "8px" }}
          />
        </TableCell>
        <TableCell sx={{ borderBottom: "none" }}>
          <Typography color="white" fontSize="14px" mb="4px">
            Staking since
          </Typography>
          <Typography
            color="white"
            fontSize="18px"
            fontFamily="Audiowide"
            mb="4px"
          >
            {day}
          </Typography>
          <Typography color="white" fontSize="14px" fontFamily="Audiowide">
            {hour}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none" }}>
          <Typography color="white" fontSize="14px" mb="4px">
            Mined Tokens
          </Typography>
          <Typography
            color="success.main"
            fontSize="16px"
            fontFamily="Audiowide"
            mb="8px"
          >
            {newtrons}
          </Typography>
          <Box>
            <Button variant="contained" sx={{ mr: "8px" }} onClick={_unStakeNft}>
              Unstake
            </Button>
            <Button
              variant="contained"
              onClick={_claimNft}
              disabled={!claimable || disable}
              sx={{
                "&.Mui-disabled": {
                  background: "gray",
                  color: "#c0c0c0"
                }
              }}>
              Claim
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "common.black" }}>
        <TableCell colSpan={4} sx={{ p: "4px 16px", borderBottom: "none" }}>
          <Typography component="span" color="white" fontSize="14px" mr="16px">
            MP: {mp}
          </Typography>
          <Typography component="span" color="white" fontSize="14px">
            RANK #{id}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default StakedNftItem;
