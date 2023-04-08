import { useState } from "react";
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
  onSpin : (i : number) => void,
  onClick : () => void
}

const Wheel = ({onSpin, onClick} : wheelProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);


  const selectItem = () => {
    let selected: number | null = null;
    let interval = setInterval(() => {
      selected = Math.floor(Math.random() * 10);
      setSelectedItem(selected);
    }, 100);

    setTimeout(() => {
      console.log(selected);
      if (selected) {
        onSpin(selected);
        onClick();
      }
      clearInterval(interval);
    }, 3000);
  };

  return (
    <Box className="wheel-container" onClick={selectItem}>
      <Box
        className="wheel"
        sx={{
          backgroundColor: "primary.light",
          transition:
            selectedItem !== null
              ? "transform 4s"
              : "transition: transform 0.25s",
          transform:
            selectedItem !== null
              ? `rotate(calc(5 * 360deg - 90deg + (-36deg * ${selectedItem})))`
              : "rotate(-90deg)",
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
