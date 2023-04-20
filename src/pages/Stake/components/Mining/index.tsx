import { Box, Container, Typography, Button } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import Wheel from "components/Wheel";
import { AppDispatch } from "state";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./mining.scss";
import BackgroundImage from "assets/images/stake_background.png";
import { claimAll, spinNft, withDraw } from "store/slice/nft-slice";
import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";
import { useWeb3React } from "@web3-react/core";

interface IMining {
  messages : Array<string>
}
const Mining = ({messages} : IMining) => {
  const dispatch = useDispatch<AppDispatch>();

  // const [spin, setSpin] = useState<number>(0);
 
  const [spinActive, setSpinActive] = useState(false);

  const [spins, setSpins] = useState<Array<number>>([]);

  const [spinShow, setSpinShow] = useState<boolean>(false);

  const { account } = useWeb3React();

  const userInfo = useSelector<IReduxState, { newtrons: number, protons: number, spins: number }>(state => {
    return state.nft.userInfo
  });

  const spinNumber = useSelector<IReduxState, number>(state => {
    return state.nft.spinNumber
  });

  const spinSuccess = useSelector<IReduxState, boolean>(state => {
    return state.nft.spinSuccess
  });

  async function _claimAll() {
    await dispatch(
      claimAll({
        walletAddress: account
      })
    )
  }

  async function _withDraw() {
    await dispatch(
      withDraw({
        walletAddress: account
      })
    )
  }

  async function _spinNft() {
    await dispatch(
      spinNft({
        walletAddress: account
      })
    );
  }

  // const handleSpinChange = (newSpinValue : number) => {
  //   setSpin(newSpinValue);
  // }
  
  useEffect(() => {
    const prevSpins = localStorage.getItem("spins");
    if (prevSpins) {
      setSpins(JSON.parse(prevSpins));
    }
  }, []);

  // useEffect(() => {
  //   if (spinSuccess) {
  //     setSpinActive(spinSuccess);
  //   }
  // }, [spinSuccess])


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (spinNumber && spinSuccess) {
        let prevSpins: string[] = JSON.parse(localStorage.getItem("spins") || "[]");
        if (prevSpins.length > 10) prevSpins.pop();
        localStorage.setItem("spins", JSON.stringify([spinNumber, ...prevSpins]));
  
        setSpins(_prevSpins => {
          if (_prevSpins.length > 10) _prevSpins.pop();
          return [spinNumber, ..._prevSpins];
        });
      }
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [spinSuccess, spinNumber])

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
      <Typography fontSize="18px" color="white" textAlign="center" py="16px">
        Every 1000th proton mined triggers Jackpot!
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
              {
                messages.map((message, index) =>
                  <Typography key={index} variant="inherit" fontFamily="LucidaSans" mb="8px">
                    <Typography
                      component="span"
                      fontFamily="LucidaSans"
                      color="primary.dark"
                      sx={{
                        wordBreak: 'break-all'
                      }}
                    >
                      {message}
                    </Typography>
                  </Typography>
                )
              }
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
              <Box className="proton-amount">
                <Typography fontSize="24px" fontWeight="600" color="white">
                  8082 TRX
                </Typography>
              </Box>
              {/* <Wheel isActive={spinActive} setActive={setSpinActive} setSpinShow={setSpinShow}  spin={spin} onSpin={setSpin} onClick={_spinNft} /> */}
              {/* <Wheel spin={spinNumber} spinSuccess={spinSuccess} spinShow={setSpinShow} spinNft={_spinNft} spinChances={userInfo.spins}/> */}
              {console.log(spinNumber, spinSuccess, "console")}
              <Wheel spinNumber={spinNumber} spinSuccess={spinSuccess} spinNft={_spinNft}/>
              <Box
                className="spin-action"
                sx={{ backgroundColor: "common.black" }}
              >
                <Typography
                  fontSize="18px"
                  fontWeight="600"
                  color="white"
                  mb="8px"
                >
                  Earned Spins: {spinShow && spinNumber}
                </Typography>
              </Box>
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
                  NeuTron
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
                        NEU
                      </Typography>
                    </Typography>
                  </Box>
                  <Button variant="contained" sx={{ whiteSpace: "nowrap" }} onClick={_claimAll}>
                    Claim all
                    <ArrowRightAltOutlinedIcon />
                  </Button>
                  <Typography
                    fontSize="14px"
                    color="error.main"
                    fontWeight="600"
                    textAlign="center"
                    mt="4px"
                  >
                    -3h
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
                      NEU
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
                  <Typography component = "div" color="white" fontSize="14px" >
                    Available: new {userInfo.newtrons}
                    <Typography
                      component="div"
                      color="primary.light"
                      fontSize="14px"
                    >
                      NEU
                    </Typography>
                  </Typography>
                  <Typography component = "div" color="white" fontSize="14px" mb="8px">
                    Available: new {userInfo.protons}
                    <Typography
                      component="span"
                      color="secondary.main"
                      fontSize="14px"
                    >
                      PRO
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
                    2d 3h
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
                Proton spin history
              </Typography>
              {
                spins.map((s, i) => {
                  if (s == 7) return <Typography
                    variant="inherit"
                    fontFamily="LucidaSans"
                    color="secondary.main"
                  >
                    7 (1 Proton Mined) #38
                  </Typography>
                  else return <Typography variant="inherit" fontFamily="LucidaSans">
                    {s}
                  </Typography>
                }
                )
              }
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Mining;
