import { Box, Typography, TableRow, TableCell, Button } from "@mui/material";
import NftImage from "assets/images/item/1 snowman epiphany.png";


type nftInfo = {
  id: Number,
  address: string,
  approve : Boolean,
  mp : Number,
  click : () => void
}

const WhitelistedItem = ({ id, address, approve, click, mp }: nftInfo) => {
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
        <TableCell sx={{ borderBottom: "none" }} align="center">
          <Typography color="white" mb="8px">
            You havent staked this collection yet.
          </Typography>
          <Button variant="contained" onClick={click}>{approve ? "stake" : "approve"}</Button>
        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "common.black" }}>
        <TableCell colSpan={2} sx={{ p: "4px 16px", borderBottom: "none" }}>
          <Typography component="span" color="white" fontSize="14px" mr="16px">
            MP: {mp}
          </Typography>
          {/* <Typography component="span" color="white" fontSize="14px" mr="16px">
            FOX #2181
          </Typography>
          <Typography component="span" color="white" fontSize="14px" mr="16px">
            RANK #2215
          </Typography> */}
          <Typography component="span" color="white" fontSize="14px">
            TOKENID #{id}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default WhitelistedItem;
