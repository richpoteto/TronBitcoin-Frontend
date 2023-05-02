import React, { useEffect, useState } from "react";
import "./wheel.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state";
import { setNftVariables } from "store/slice/nft-slice";
import { notification } from "utils/notification";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";

const spins = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

interface CustomCSSProperties1 extends React.CSSProperties {
  '--item-nb': number;
}

interface CustomCSSProperties2 extends React.CSSProperties {
  '--nb-item': number;
  '--selected-item': number;
}

interface IWheel {
  spinNumber: number,
  spinSuccess: boolean,
  opportunites: number,
  spinNft: () => void
}

const Wheel = ({ spinNumber, spinSuccess, opportunites, spinNft }: IWheel) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [click, setClick] = useState<boolean>(false);

  const action = () => {
    dispatch(setNftVariables({ spinSuccess: false }));
  };

  const userInfo = useSelector<
    IReduxState,
    { newtrons: number; protons: number; spins: number }
  >((state) => {
    return state.nft.userInfo;
  });

  const selectItem = () => {
    if (!selectedItem) {
      setSelectedItem(spinNumber - 1);
    } else {
      setSelectedItem(0);
      setTimeout(() => selectItem, 500);
    }
  }

  useEffect(() => {
    if (spinSuccess) {
      setSelectedItem(spinNumber - 1);
      setClick(false);

      setTimeout(() => {
        action();
      }, 20000);
    }
  }, [spinSuccess]);


  const handleClick = () => {
    if (opportunites) {
      if (!click) {
        setClick(true);
        spinNft();
        let nextNumber = selectedItem + 5;
        if (selectedItem + 5 > 10) nextNumber = selectedItem - 5;
        setSelectedItem(nextNumber);
      }
    } else {
      notification({ title: "You don't have spin opportunities", type: 'danger' });
    }
  };

  return (
    <div className="wheel-container">
      <div
        className={`wheel ${selectedItem ? "spinning" : ""}`}
        style={{ "--nb-item": 10, "--selected-item": selectedItem } as CustomCSSProperties2}
      >
        {
          spins.map((spin, index) =>
            <div
              className={index !== 6 ? "wheel-item" : "wheel-item7"}
              key={index}
              style={{ "--item-nb": index } as CustomCSSProperties1}
            >
              {spin}
            </div>
          )
        }
      </div>
      <Typography
          component="div"
          color= "blue"
          fontSize="15px"
          sx={{textAlign : 'right'}}
          mr="-15px"
        >
          Available Spins : 
        </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',

        }}
        onClick={handleClick}
      >
        <Box
          className="spin-action"
          borderRadius="8px"
          fontSize="24px"
          color="white"
          sx={{
            backgroundColor: "rgb(255, 184, 0)",
            width: '200px',
            marginRight: "20px"
          }}
        >
          Spin
        </Box>
        <Typography
          component="div"
          color= {
            userInfo.spins ? "primary.light" : "red"
          }
          fontSize="40px"
          sx={{display : 'flex', alignItems : 'center'}}
        >
          {userInfo.spins}
        </Typography>
      </Box>
    </div>
  );
};

export default Wheel;
