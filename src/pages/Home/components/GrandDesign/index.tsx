import { Box, Container, Typography } from "@mui/material";
import "./grand-design.scss";

const GrandDesign = () => {
  return (
    <Box className="grand-design-container">
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          fontFamily="Audiowide"
          mb="12px"
          color="white"
          sx={{ fontSize: { xs: "24px", md: "28px" } }}
        >
          The Grand Design
        </Typography>
        <Typography variant="inherit" fontSize="16px" color="rgb(169, 168, 166)">
          The Large Hadron Collider wasn't built in a day!
        </Typography>
      </Container>
    </Box>
  );
};

export default GrandDesign;
