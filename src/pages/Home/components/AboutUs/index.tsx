import { Box, Container, Typography } from "@mui/material";
import "./about-us.scss";

const AboutUs = () => {
  return (
    <Box
      sx={{
        p: "80px 24px",
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          fontFamily="Audiowide"
          mb="20px"
          textAlign="center"
          sx={{ fontSize: { xs: "24px", md: "40px" } }}
        >
          Neutron the Bitcoin of Tron NFT's
        </Typography>

        <Typography
          variant="h4"
          fontFamily="Audiowide"
          fontWeight="600"
          mb="16px"
          color="secondary.main"
          sx={{ fontSize: { xs: "20px", md: "24px" } }}
        >
          About Us:
        </Typography>

        <Typography variant="inherit" mb="16px">
          Neutron was created to fill a gap in the Tron NFT space. In most NFT
          projects users take all the risk up front purchasing expensive NFTs
          and waiting for that project to build some utility. We wanted to build
          something different, build staking first to show we are committed,
          taking a risk and then slowly build a platform that works for the
          community that supported it the most.
        </Typography>
        <Typography variant="inherit" fontWeight="600" color="secondary.main">
          100% of Neutron tokens have to be mined by staking Tron NFT's
        </Typography>
        <Typography variant="inherit" fontWeight="600" color="secondary.main">
          100% of Proton tokens have to be mined by winning the Proton Spin
        </Typography>
        <Typography variant="inherit" fontWeight="600" color="secondary.main">
          No pre-mined tokens
        </Typography>
        <Typography variant="inherit" fontWeight="600" color="secondary.main">
          No Airdrops
        </Typography>
        <Typography variant="inherit" fontWeight="600" color="secondary.main">
          No Team Supply
        </Typography>
        <Typography variant="inherit" fontWeight="600" color="secondary.main">
          No Marketing Supply
        </Typography>
        <Typography variant="inherit" mt="16px">
          It's what comes next that excites us the most! Each token on the
          Neutron platform has its utility! Some we can explain now and other
          utilities will have to wait! People have been asking us why do you
          need multiple different tokens? We have a simple answer, in order to
          make atoms you need Protons, Neutrons, & Electrons. Thats all we can
          say now about that, we have an excited future planned for the Tron
          Blockchain!
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutUs;
