import { Box, Container, Typography } from "@mui/material";
import "./ticketmanagement.scss";

const TicketCard = ({ title, lists }: { title: string; lists: string[] }) => {
  return (
    <Box className="ticketcard-content">
      <Box mb="16px">
        <Typography
          variant="h3"
          fontFamily="Audiowide"
          fontSize="20px"
          color="white"
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "12px",
        }}
      >
        {lists.map((list, key) => (
          <Box key={key} className="list-item">
            {list}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const TicketManagement = () => {
  return (
    <Box
      className="ticketmanagement-container"
      sx={{ backgroundColor: "primary.main" }}
    >
      <Container maxWidth="xl" className="ticketmanagement-content">
        <TicketCard
          title="Theoretical"
          lists={["Multichain Staking", "Multichain Lottery Marketplace"]}
        />
        <TicketCard title="Practical" lists={["NFT Collection", "NFT Game"]} />
        <TicketCard title="Working on" lists={["Lottery Marketplace"]} />
        <TicketCard
          title="Done"
          lists={[
            "Jackpot System",
            "Proton Token",
            "Neutron Token",
            "Tron NFT Staking Website",
          ]}
        />
      </Container>
    </Box>
  );
};

export default TicketManagement;
