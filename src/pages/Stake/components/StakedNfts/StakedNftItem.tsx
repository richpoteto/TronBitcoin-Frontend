import { Box, Typography, TableRow, TableCell, Button } from "@mui/material";
import { AppDispatch } from "state";
import { useDispatch } from "react-redux";
import { useAddress, useWeb3Context } from "../../../../hooks";

import NftImage from "assets/images/item/1 snowman epiphany.png";
import { claimNft, unStakeNft } from "store/slice/nft-slice";

type StakedNftItemProps = {
  stakedDate : string,
  address : string,
  id : number,
  newtrons : number
}

const StakedNftItem = ({address, id, stakedDate, newtrons} : StakedNftItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const walletAddress = useAddress();

  const { provider, chainID, connected } = useWeb3Context();

  async function _unStakeNft() {
    await dispatch(
      unStakeNft({
        provider,
        networkID: chainID,
        address,
        walletAddress,
        tokenId : id
      })
    )
  }

  async function _claimNft () {
    await dispatch(
      claimNft({
        networkID : chainID,
        provider,
        tokenId : id,
        address,
        walletAddress
      })
    )
  }

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: "common.black",
          "&:not(:first-child)": {
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
            {stakedDate}
          </Typography>
          <Typography color="white" fontSize="14px" fontFamily="Audiowide">
            11:48 PM
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none" }}>
          <Typography color="white" fontSize="14px" mb="4px">
            Unlocks on
          </Typography>
          <Typography
            color="white"
            fontSize="18px"
            fontFamily="Audiowide"
            mb="4px"
          >
            {stakedDate}
          </Typography>
          <Typography color="white" fontSize="14px" fontFamily="Audiowide">
            11:48 PM
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
            <Button variant="contained" onClick={_claimNft}>Claim</Button>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "common.black" }}>
        <TableCell colSpan={4} sx={{ p: "4px 16px", borderBottom: "none" }}>
          <Typography component="span" color="white" fontSize="14px" mr="16px">
            MP: 15000 1125N/HR
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
