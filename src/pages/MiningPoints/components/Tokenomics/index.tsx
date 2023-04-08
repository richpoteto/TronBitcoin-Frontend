import {
  Box,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import "./tokenomics.scss";

interface ListTypes {
  year: number;
  released: number;
  dailyRelease: number;
}

const lists: ListTypes[] = [
  {
    year: 1,
    released: 5000000,
    dailyRelease: 13687.53,
  },
  {
    year: 2,
    released: 4000000,
    dailyRelease: 13687.53,
  },
  {
    year: 3,
    released: 3000000,
    dailyRelease: 13687.53,
  },
  {
    year: 4,
    released: 2500000,
    dailyRelease: 13687.53,
  },
  {
    year: 5,
    released: 2000000,
    dailyRelease: 13687.53,
  },
  {
    year: 6,
    released: 2000000,
    dailyRelease: 13687.53,
  },
  {
    year: 7,
    released: 1500000,
    dailyRelease: 13687.53,
  },
  {
    year: 8,
    released: 1500000,
    dailyRelease: 13687.53,
  },
  {
    year: 9,
    released: 1000000,
    dailyRelease: 13687.53,
  },
  {
    year: 10,
    released: 500000,
    dailyRelease: 13687.53,
  },
];

const Tokenomics = () => {
  return (
    <Box sx={{ width: { xs: "100%", md: "50%" } }}>
      <Typography
        color="primary.light"
        textAlign="center"
        sx={{ fontSize: { xs: "20px", md: "24px" } }}
        mb="8px"
      >
        Neutron Tokenomics
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#595959", color: "white" }}>
                Year
              </TableCell>
              <TableCell sx={{ backgroundColor: "#595959", color: "white" }}>
                Tokens Released
              </TableCell>
              <TableCell sx={{ backgroundColor: "#595959", color: "white" }}>
                Daily Release
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.map((list: ListTypes, key: number) => (
              <TableRow key={key}>
                <TableCell sx={{ backgroundColor: "#bfbfbf" }}>
                  {list.year}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#bfbfbf" }}>
                  {Intl.NumberFormat("en-US").format(list.released)}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#bfbfbf" }}>
                  {Intl.NumberFormat("en-US").format(list.dailyRelease)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#595959",
                  color: "primary.light",
                  borderBottom: "none",
                }}
              >
                Total
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#595959",
                  color: "primary.light",
                  borderBottom: "none",
                }}
              >
                {Intl.NumberFormat("en-US").format(21000000)}
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#595959",
                  color: "primary.light",
                  borderBottom: "none",
                }}
              ></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tokenomics;
