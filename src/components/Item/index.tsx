import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./item.scss";

const Item = ({
  image,
  nftName,
  collectionName,
  nftId,
  rank,
  verified,
  isSmall,
  miningPoint,
  minintPointColor,
  buttonText,
  buttonSubText,
}: {
  image: string;
  nftName: string;
  collectionName: string;
  nftId: number;
  rank: number | string;
  verified: boolean;
  isSmall: boolean;
  miningPoint: string;
  minintPointColor: string;
  buttonText: string;
  buttonSubText: string;
}) => {
  return (
    <Box className="slick-container">
      <Box className="item-container" width="220px">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"          
        >
        <Box
          component="img"
          src={image}
          sx={{ width: "100%", aspectRatio: "1.1", borderRadius: "8px" }}
        />
        </Box>
        <Box
          className="favorite-icon"
          sx={{
            p: "4px 8px",
            backgroundColor: minintPointColor,
          }}
        >
          <Typography
            fontSize={isSmall ? "12px" : "14px"}
            fontWeight="600"
            color={miningPoint === "K" ? "white" : "black"}
          >
            {miningPoint}
          </Typography>
        </Box>
        <Box sx={{ p: "16px 12px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              mr="4px"
              fontSize={isSmall ? "12px" : "14px"}
              fontWeight="600"
              sx={{ color: "#4c4c4c" }}
            >
              {nftName}
            </Typography>
            {verified && (
              <CheckCircleIcon
                sx={{ color: "#84cc16", fontSize: isSmall ? "12px" : "16px" }}
              />
            )}
          </Box>
          <Typography
            fontSize={isSmall ? "16px" : "20px"}
            fontWeight="600"
            color="black"
          >
            {collectionName} #{nftId}
          </Typography>          
          <Button variant="contained" fullWidth
            sx={{
              background: "#0085ff",
              py: "10px",
              mt: "11px",
            }}
          >
            <Typography
              mr="4px"
              color="black"
              fontWeight="600"
              sx={{ fontSize: isSmall ? "14px" : "16px" }}
            >
              {buttonText}
            </Typography>
            {/* <Typography
              color="white"
              sx={{ fontSize: isSmall ? "12px" : "14px" }}
            >
              {buttonSubText}
            </Typography> */}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
