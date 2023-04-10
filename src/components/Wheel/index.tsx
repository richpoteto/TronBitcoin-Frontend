import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import "./wheel.scss";

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
  isActive: boolean,
  spin: number,
  onSpin: (i: number) => void,
  onClick: (s: number) => void,
  setActive: (i: boolean) => void
}

const Wheel = ({ onSpin, onClick, isActive, spin, setActive }: wheelProps) => {
  const [angle, setAngle] = useState<number>(-90);
  const [number, setNumber] = useState(1);

  const getA = () => {
    let total = 360 * 10;
    total += spin < number ? 36 * (number - spin) : 36 * (10 - spin + number);

    return total / 4.5;
  }

  const selectClick = () => {
    if (!isActive) {
      let selected = Math.floor(Math.random() * 10) + 1;
      onSpin(selected);
      onClick(selected);
    }
  }

  useEffect(() => {
    if (isActive) {
      console.log(number, spin, 99999999);
      let time = 0;
      const interval = setInterval(() => {
        const delta = 0.3 * getA() - 0.5 * getA() * (0.2 * time + 0.01);

        setAngle(prevAngle => {
          console.log(prevAngle, (3 - time) * getA(), 11111);
          return prevAngle + delta;
        }
        );
        time += 0.1;
      }, 100);

      const timeout = setTimeout(() => {
        setNumber(spin);
        setActive(false);
        clearInterval(interval);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      }

    }
  }, [isActive, setAngle, spin]);

  return (
    <Box className="wheel-container" onClick={selectClick}>
      <Box
        className="wheel"
        sx={{
          backgroundColor: "primary.light",
          transition:
            isActive
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
