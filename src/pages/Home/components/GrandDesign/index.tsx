import { Box, Container, Typography } from "@mui/material";
import "./grand-design.scss";

const GrandDesign = () => {
  return (
    <Box className="grand-design-container">
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          fontFamily="Audiowide"
          mb="20px"
          color="white"
          sx={{ fontSize: { xs: "32px", md: "44px" } }}
        >
          The Grand Design
        </Typography>
        <Typography variant="inherit" fontSize="18px" color="white">
          The Large Hadron Collider wasn't built in a day!
        </Typography>
      </Container>
    </Box>
  );
};

export default GrandDesign;
