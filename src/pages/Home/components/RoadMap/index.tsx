import { Box, Container, Typography } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import StepImage1 from "assets/images/roadmap/a.png";
import StepImage2 from "assets/images/roadmap/b.png";
import StepImage3 from "assets/images/roadmap/c.png";
import StepImage4 from "assets/images/roadmap/d.png";
import "./roadmap.scss";

const Step = ({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: string;
}) => {
  return (
    <Box className="step-container">
      <Box
        component="img"
        src={image}
        sx={{
          width: "100%",
          display: "block",
        }}
      />
      <Box className="step-info">
        <Typography
          variant="h3"
          className="step-info-title"
          color="secondary.main"
        >
          {title}
        </Typography>
        <Typography variant="inherit" className="step-info-text">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

const RoadMap = () => {
  return (
    <Box className="roadmap-container">
      <Container maxWidth="xl" className="roadmap-content">
        <Step
          image={StepImage1}
          title="NFT Staking"
          text="Mine Neutron, our platforms future utility token and Proton our multi-use token used for up coming NFT mints and a 1% cut in all marketplace sales"
        />
        <Box sx={{ minWidth: "40px", display: { xs: "none", lg: "block" } }}>
          <ArrowForwardIosOutlinedIcon
            sx={{ color: "#00e7ff", fontSize: "40px" }}
          />
        </Box>
        <Step
          image={StepImage2}
          title="Unique Marketplace"
          text="Our upcoming Marketplace will take 'community first' to a new level! We plan on implementing some very nice lifetime passive imcome features!"
        />
        <Box sx={{ minWidth: "40px", display: { xs: "none", lg: "block" } }}>
          <ArrowForwardIosOutlinedIcon
            sx={{ color: "#00e7ff", fontSize: "40px" }}
          />
        </Box>
        <Step
          image={StepImage3}
          title="NFT Collection Mint"
          text="Neutron's upcoming NFTs will only be minted with Proton tokens, So don't hold back well staking!"
        />
        <Box sx={{ minWidth: "40px", display: { xs: "none", lg: "block" } }}>
          <ArrowForwardIosOutlinedIcon
            sx={{ color: "#00e7ff", fontSize: "40px" }}
          />
        </Box>
        <Step
          image={StepImage4}
          title="NeuTron NFT Game"
          text="Our Neutron NFT's will battle for control of 100 Ultra rare NFT's which control 1% of all Marketplace sales. Will your Neutron NFT's be strong enough to take control?!"
        />
      </Container>
    </Box>
  );
};

export default RoadMap;
