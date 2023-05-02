import { Box, Typography, TableRow, TableCell, Button } from "@mui/material";
import { AppDispatch } from "state";
import { useDispatch } from "react-redux";
import { useAddress, useWeb3Context } from "../../../../hooks";
import { useWeb3React } from "@web3-react/core";
import NftImage from "assets/images/item/1 snowman epiphany.png";
import { claimNft, unStakeNft } from "store/slice/nft-slice";
import { getDayFromTimestamp, getDifference, getHourFromTimestamp } from "utils/getDate";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";
import { notification } from "utils/notification";
type StakedNftItemProps = {
  stakedDate: number;
  claimedDate: number;
  address: string;
  id: number;
  mp: number;
  claimable: boolean;
  newtrons: number;
};
const StakedNftItem: React.FC<StakedNftItemProps> = ({ address, id, mp, claimable, stakedDate, claimedDate, newtrons }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { account } = useWeb3React();
  const stakedDay = getDayFromTimestamp(stakedDate);
  const stakedHour = getHourFromTimestamp(stakedDate);

  const claimedDay = getDayFromTimestamp(claimedDate);
  const claimedHour = getHourFromTimestamp(claimedDate);

  const startTime: number = useSelector<IReduxState, number>(
    (state) => state.nft.startTime
  );

  const [days, setDays] = useState(0);

  useEffect(() => {
    if (account && account !== "") {
      const updateDaysAndLog = () => {
        setDays(getDifference(startTime, claimedDate));
      };

      updateDaysAndLog();
      
      const timer = setInterval(updateDaysAndLog, 4 * 60 * 1000);
      
      return () => {
        clearInterval(timer);
      }
    }
  }, [account]);

  async function _unStakeNft() {
    const interval = getDifference(startTime, stakedDate);

    if (!interval) {
      notification({ title: "Early unstake", type: "danger" });
    }

    await dispatch(
      unStakeNft({
        address,
        walletAddress: account,
        tokenId: id
      })
    )
  }

  async function _claimNft() {
    const interval = getDifference(startTime, claimedDate);

    if (!interval) {
      notification({ title: "Please claim 1 day later!", type: "danger" });
    }

    await dispatch(
      claimNft({
        tokenId: id,
        address,
        walletAddress: account
      })
    );
  }

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
            {stakedDay}
          </Typography>
          <Typography color="white" fontSize="14px" fontFamily="Audiowide">
            {stakedHour}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none" }}>
          <Typography color="white" fontSize="14px" mb="4px">
            last claim time
          </Typography>
          <Typography
            color="white"
            fontSize="18px"
            fontFamily="Audiowide"
            mb="4px"
          >
            {claimedDay}
          </Typography>
          <Typography color="white" fontSize="14px" fontFamily="Audiowide">
            {claimedHour}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none" }}>
          <Typography color="white" fontSize="14px" mb="4px">
            Mined Tokens
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography
              color="success.main"
              fontSize="16px"
              fontFamily="Audiowide"
              mb="8px"
              mr="30px"
            >
              {newtrons}
            </Typography>
            <Typography
              color={days > 3 ? "red" : "blue"}
              fontSize="16px"
              fontFamily="Audiowide"
              mb="8px"
            >
              {days} Days
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" sx={{ mr: "8px" }} onClick={_unStakeNft}>
              Unstake
            </Button>
            <Button
              variant="contained"
              onClick={_claimNft}
              //disabled={!claimable || disable}
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