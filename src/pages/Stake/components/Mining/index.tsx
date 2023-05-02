import { Box, Container, Typography, Button } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import Wheel from "components/Wheel";
import { AppDispatch } from "state";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./mining.scss";
import BackgroundImage from "assets/images/stake_background.webp";
import { claimAll, spinNft, withDraw } from "store/slice/nft-slice";
import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";
import { useWeb3React } from "@web3-react/core";

import TronIcon from "../../../../assets/images/tron.png";
import { getDayFromTimestamp, getDifference, getHourFromTimestamp } from "utils/getDate";
import { notification } from "utils/notification";

interface IMining {
  messages: Array<string>;
}
const Mining = ({ messages }: IMining) => {
  const dispatch = useDispatch<AppDispatch>();

  const [spins, setSpins] = useState<Array<number>>([]);

  const [claimdays, setClaimDays] = useState(0);

  const [withdrawdays, setWithdrawDays] = useState(0);

  const { account } = useWeb3React();

  const userInfo = useSelector<
    IReduxState,
    { newtrons: number; protons: number; spins: number, withdrawTime: number }
  >((state) => {
    return state.nft.userInfo;
  });

  const spinNumber = useSelector<IReduxState, number>((state) => {
    return state.nft.spinNumber;
  });

  const spinSuccess = useSelector<IReduxState, boolean>((state) => {
    return state.nft.spinSuccess;
  });

  const status = useSelector<IReduxState, { totalNewTrons: number, totalProtons: number }>(state => {
    return state.nft.status
  });

  const StakedNftsFromUser = useSelector<IReduxState, Array<{ collection: string, nftName: string, tokenId: number, newtrons: number, protons: number, mp: number, stakedTimeStamp: number, claimedTimeStamp: number, claimable: boolean }>>(state => {
    if (state.nft) {
      return state.nft.StakedNftsFromUser;
    }
    return [];
  });

  const startTime: number = useSelector<IReduxState, number>(
    (state) => state.nft.startTime
  );

  useEffect(() => {
    const updateDaysAndLog = () => {
      setWithdrawDays(getDifference(startTime, userInfo.withdrawTime));
    };

    updateDaysAndLog();

    const timer = setInterval(updateDaysAndLog, 4 * 60 * 1000);

    return () => {
      clearInterval(timer);
    }
  }, [userInfo.withdrawTime]);

  useEffect(() => {
    if (StakedNftsFromUser.length) {
      const closest = StakedNftsFromUser.slice().sort((a, b) => a.claimedTimeStamp - b.claimedTimeStamp);

      const updateDaysAndLog = () => {
        setClaimDays(getDifference(startTime, closest[0].claimedTimeStamp));
      };

      updateDaysAndLog();

      const timer = setInterval(updateDaysAndLog, 4 * 60 * 1000);

      return () => {
        clearInterval(timer);
      }
    }
  }, [StakedNftsFromUser]);

  function checkClaimableAll() {
    let claimableNfts : any[] = [];

    if (StakedNftsFromUser.length) {
      StakedNftsFromUser.map((nft, i) => {
        if (!getDifference(startTime, nft.claimedTimeStamp)) {
          notification({ title: 'Early claim token ' + nft.tokenId, type: 'warning' });
        } else {
          claimableNfts.push({collection : nft.collection, tokenId : nft.tokenId});
        }
      })
      if (claimableNfts.length) return claimableNfts;
    }

    notification({ title: 'No nfts to claim!', type: 'danger' });
    return [];
  }

  async function _claimAll() {
    const claimableNfts = checkClaimableAll();

    if (!claimableNfts.length) return;

    await dispatch(
      claimAll({
        walletAddress: account,
        claimableNfts
      })
    );
  }

  async function _withDraw() {
    await dispatch(
      withDraw({
        walletAddress: account,
      })
    );
  }

  async function _spinNft() {
    await dispatch(
      spinNft({
        walletAddress: account,
      })
    );
  }


  useEffect(() => {
    const prevSpins = localStorage.getItem("spins");
    if (prevSpins) {
      setSpins(JSON.parse(prevSpins));
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (spinNumber && spinSuccess) {
        let prevSpins: string[] = JSON.parse(
          localStorage.getItem("spins") || "[]"
        );
        if (prevSpins.length > 10) prevSpins.pop();
        localStorage.setItem(
          "spins",
          JSON.stringify([spinNumber, ...prevSpins])
        );

        setSpins((_prevSpins) => {
          if (_prevSpins.length > 10) _prevSpins.pop();
          return [spinNumber, ..._prevSpins];
        });
      }
    }, 15000);

    return () => clearTimeout(timeoutId);
  }, [spinSuccess, spinNumber]);

  return (
    <Box
      sx={{
        backgroundColor: "secondary.dark",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        fontSize="20px"
        color="white"
        fontFamily="Audiowide"
        textAlign="center"
        py="16px"
      >
        Every 1000th newtron mined triggers Jackpot!
      </Typography>
      <Container maxWidth="xl" sx={{ py: "24px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Box
            className="card-desc"
            sx={{
              mb: { xs: "24px", lg: 0 },
              mt: { xs: 0, lg: "16px" },
              maxWidth: { xs: "100%", lg: "300px" },
              backgroundColor: "primary.light",
            }}
          >
            <Box
              className="card-desc-content"
              sx={{ backgroundColor: "common.black" }}
            >
              <Typography
                variant="h2"
                fontFamily="Audiowide"
                fontSize="20px"
                mb="24px"
                className="card-desc-title"
              >
                Action Feed:
              </Typography>
              {messages.map((message, index) => (
                <Typography
                  key={index}
                  variant="inherit"
                  fontFamily="LucidaSans"
                  mb="8px"
                >
                  <Typography
                    component="span"
                    fontFamily="LucidaSans"
                    color="primary.white"
                    sx={{
                      wordBreak: "break-all",
                    }}
                  >
                    {message}
                  </Typography>
                </Typography>
              ))}
            </Box>
          </Box>
          <Box className="mining-container">
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row", lg: "column" },
                textAlign: "center",
                justifyContent: "space-around",
                alignItems: "center",
                mb: "16px",
              }}
            >
              <Box
                className="proton-amount"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  component="img"
                  src={TronIcon}
                  width="32px"
                  height="32px"
                  alt=""
                  mr="8px"
                />
                <Typography
                  fontSize="24px"
                  fontWeight="600"
                  color="rgb(255, 184, 0)"
                >
                  {status.totalNewTrons}
                </Typography>
              </Box>
              <Wheel
                spinNumber={spinNumber}
                spinSuccess={spinSuccess}
                spinNft={_spinNft}
                opportunites={userInfo.spins}
              />
            </Box>
            <Box
              className="mining-content"
              sx={{ backgroundColor: "common.black" }}
            >
              <Typography
                textAlign="center"
                fontSize="28px"
                color="white"
                mb="24px"
              >
                <Typography
                  component="span"
                  color="primary.light"
                  fontSize="28px"
                >
                  Proton
                </Typography>{" "}
                Mining
              </Typography>

              <Box className="mining-action">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: { xs: "24px", sm: 0 },
                  }}
                >
                  <Box className="mining-status">
                    <SettingsOutlinedIcon
                      sx={{ color: "error.main", fontSize: "18px" }}
                    />
                    <Typography color="white" fontSize="14px">
                      Mined: new {Intl.NumberFormat("en-US").format(1778.552)}{" "}
                      <Typography
                        component="span"
                        color="primary.light"
                        fontSize="14px"
                      >
                        Pro
                      </Typography>
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{ whiteSpace: "nowrap" }}
                    onClick={_claimAll}
                  >
                    Claim all
                    <ArrowRightAltOutlinedIcon />
                  </Button>
                  <Typography
                    fontSize="14px"
                    color={claimdays > 3 ? "red" : "green"}
                    fontWeight="600"
                    textAlign="center"
                    mt="4px"
                  >
                    {claimdays}   days
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "black",
                    borderRadius: "8px",
                    p: "8px 16px",
                    borderWidth: "1px",
                    borderColor: "primary.light",
                    borderStyle: "solid",
                    maxWidth: "fit-content",
                    mx: "auto",
                  }}
                  textAlign="center"
                >
                  <Typography color="white" fontSize="14px">
                    Total Missed: {Intl.NumberFormat("en-US").format(31.34)}{" "}
                    <Typography
                      component="span"
                      color="primary.light"
                      fontSize="14px"
                    >
                      Protons
                    </Typography>
                  </Typography>
                  <Typography color="white" fontSize="14px">
                    Make sure you are claiming every 3 days!
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: { xs: "24px", sm: 0 },
                  }}
                >
                  <Typography component="div" color="white" fontSize="14px">
                    Available: new {userInfo.newtrons}
                    <Typography
                      component="div"
                      color="primary.light"
                      fontSize="14px"
                    >
                      PRO
                    </Typography>
                  </Typography>
                  <Typography
                    component="div"
                    color="white"
                    fontSize="14px"
                    mb="8px"
                  >
                    Available: new {userInfo.protons}
                    <Typography
                      component="span"
                      color="secondary.main"
                      fontSize="14px"
                    >
                      NEW
                    </Typography>
                  </Typography>
                  <Button variant="contained" onClick={_withDraw}>
                    Withdraw
                    <ArrowRightAltOutlinedIcon />
                  </Button>
                  <Typography
                    fontSize="14px"
                    color="white"
                    fontWeight="600"
                    textAlign="center"
                    mt="4px"
                  >
                    {withdrawdays}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className="card-desc"
            sx={{
              mb: { xs: "24px", lg: 0 },
              mt: { xs: 0, lg: "16px" },
              maxWidth: { xs: "100%", lg: "300px" },
              backgroundColor: "primary.light",
            }}
          >
            <Box
              className="card-desc-content"
              sx={{ backgroundColor: "common.black" }}
            >
              <Typography
                variant="h2"
                fontFamily="Audiowide"
                fontSize="20px"
                mb="24px"
                className="card-desc-title"
              >
                Newtron spin history
              </Typography>
              {spins.map((s, i) => {
                if (s == 7)
                  return (
                    <Typography
                      variant="inherit"
                      fontFamily="LucidaSans"
                      color="secondary.main"
                    >
                      7 (1 Proton Mined) #{userInfo.newtrons}
                    </Typography>
                  );
                else
                  return (
                    <Typography variant="inherit" fontFamily="LucidaSans">
                      {s}
                    </Typography>
                  );
              })}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Mining;
