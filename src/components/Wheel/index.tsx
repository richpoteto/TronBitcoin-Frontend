import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import "./wheel.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state";
import { setNftVariables } from "store/slice/nft-slice";
import { notification } from "utils/notification";

const colors = [
  "#ff7523",
  "#6164ff",
  "#61c8ff",
  "#61fff5",
  "#61ffba",
  "#61ff71",
  "#8bff61",
  "#b0ff61",
  "#dbff61",
  "#ffd261",
];

type wheelProps = {
  spin: number,
  spinSuccess : boolean,
  spinChances : number,
  spinShow : (i : boolean) => void,
  spinNft : () => void
}

const Wheel = ({ spin, spinSuccess, spinNft, spinShow, spinChances }: wheelProps) => {
  const [angle, setAngle] = useState<number>(-90);
  // const [number, setNumber] = useState(1);
  const [active, setActive] = useState<boolean>(false);

  let interval : any, timeout : any, a : number;
  const dispatch = useDispatch<AppDispatch>();

  const getA = () => {
    const rAngle = angle + 90;
    const total = 360 * 10 + 36 * (spin - 1) - (rAngle - Math.floor(rAngle / 360) * 360);
    return total / 4.5;
  }

  const selectClick = () => {
    if (spinChances) {
      notification({title : "You don't have spin opportunites!", type : 'danger' });
      return;
    }
    if (!active) {
      setActive(true);
      spinShow(false);
      spinNft();
      dispatch(setNftVariables({spinSuccess : true}));
    }
  }

  useEffect(() => {
    if (active) {
      let time = 0, delay = 0;
      
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);

      if (!spinSuccess) return;

      if (spin) delay = 3000;
      else delay = 100000;

      console.log(delay, time, interval, timeout, angle, getA(), spin, 22222);
      
      a = getA();
      interval = setInterval(() => {
        let delta = 0;
        if (spin) {
          delta = 0.3 * a - 0.5 * a * (0.2 * time + 0.01);
        } else {
          delta = 10;
        }
        setAngle(prevAngle => {
          return prevAngle + delta;
        });
        time += 0.1;
      }, 100);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setActive(false);
        spinShow(true);
        dispatch(setNftVariables({spinNumber : 0}));
      }, delay);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      }
    }
  }, [active, spinSuccess, setAngle, spin]);

  return (
    <Box className="wheel-container" onClick={selectClick}>
      <Box
        className="wheel"
        sx={{
          backgroundColor: "primary.light",
          transition:
          active
              ? "transform 4s"
              : "transition: transform 0.25s",
          transform:
            "rotate(" + angle + "deg)"
        }}
      >
        {Array.from(Array(10)).map((_, index: number) => (
          <Box
            className={`wheel-item`}
            key={index}
            sx={{
              transform: `translateY(-50%) rotate(calc(${index} * (36deg)))`,
              "&::before": {
                borderRightColor: colors[index],
              },
            }}
          >
            {index + 1}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Wheel;
