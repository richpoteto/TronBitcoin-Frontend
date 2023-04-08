import { Box, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "./chart.scss";

const Chart: React.FC = () => {
  const series = [
    { data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] },
  ];
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: "#525252",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#62ceec"],
      },
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      labels: {
        show: true,
        style: {
          fontSize: "14px",
          colors: ["#fff"],
        },
      },
      axisBorder: {
        show: true,
        color: "#525252",
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#525252",
        height: 6,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },
    colors: ["transparent"],
    stroke: {
      width: 1,
      colors: ["#ff7523"],
    },
  };
  return (
    <Box sx={{ width: { xs: "100%", md: "50%" } }}>
      <Typography
        color="primary.light"
        textAlign="center"
        sx={{ fontSize: { xs: "20px", md: "24px" } }}
      >
        Neutron Tokens Released
      </Typography>
      {/* @ts-ignore */}
      <ReactApexChart
        type="bar"
        options={options}
        series={series}
        height={350}
      />
    </Box>
  );
};

export default Chart;
