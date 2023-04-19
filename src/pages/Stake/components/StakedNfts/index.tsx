import { useState, useEffect } from "react";
import { Box, Container, Typography, Table, TableBody } from "@mui/material";
import Select from "react-select";
import StakedNftItem from "./StakedNftItem";
import { AppDispatch } from "state";
import { useDispatch } from "react-redux";
import "./staked-nfts.scss";

const options = [
  { value: "All NFT's", label: "All NFT's" },
  { value: "Tpunks", label: "Tpunks" },
  { value: "Tron Meebits", label: "Tron Meebits" },
  { value: "JUST BAYC", label: "JUST BAYC" },
  { value: "Bored Ape Tron Club", label: "Bored Ape Tron Club" },
  { value: "Mutant Ape Tron Club", label: "Mutant Ape Tron Club" },
  { value: "Tron Cool Cats", label: "Tron Cool Cats" },
  { value: "Tron Bulls", label: "Tron Bulls" },
  { value: "GeekHeads", label: "GeekHeads" },
  { value: "Bored Ape Yacht Club Tron", label: "Bored Ape Yacht Club Tron" },
  { value: "Mutant Ape Yacht Club Tron", label: "Mutant Ape Yacht Club Tron" },
  { value: "Tapes", label: "Tapes" },
  { value: "World Of Women", label: "World Of Women" },
  { value: "Doge pound Tron", label: "Doge pound Tron" },
  { value: "Trex Punks", label: "Trex Punks" },
  { value: "FoodPunks", label: "FoodPunks" },
  { value: "Vibra Goons", label: "Vibra Goons" },
  { value: "Battle Angel", label: "Battle Angel" },
  { value: "Tron Ninjas", label: "Tron Ninjas" },
  { value: "Robotrons", label: "Robotrons" },
  { value: "Devikins", label: "Devikins" },
  { value: "Cubies", label: "Cubies" },
  { value: "JustRug", label: "JustRug" },
  { value: "Primo", label: "Primo" },
  { value: "Baked Bulls", label: "Baked Bulls" },
];

interface IStakedNfts {
  nftsOfUser : any[]  
}

const StakedNfts = ({nftsOfUser} : IStakedNfts) => {
  const [selectedOption, setSelectedOption] = useState<any>({
    value: "All NFT's",
    label: "All NFT's",
  });

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };
  
  return (
    <Box sx={{ backgroundColor: "common.black" }}>
      <Container maxWidth="xl" sx={{ py: "24px" }}>
        <Box
          className="staked-nfts-content"
          sx={{ backgroundColor: "secondary.light" }}
        >
          <Box
            mb="24px"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Typography
              fontFamily="Audiowide"
              color="white"
              sx={{
                fontSize: { xs: "24px", md: "28px" },
                mb: { xs: "16px", sm: 0 },
              }}
            >
              Currently Staked NFT's
            </Typography>
            <Select
              defaultValue={selectedOption}
              value={selectedOption}
              onChange={handleChange}
              options={options}
              className="nfts-sort"
            />
          </Box>
          <Box className="table-container">
            <Table sx={{ minWidth: 950 }}>
              <TableBody>
                {
                  nftsOfUser.map((nft, key) => (
                    nft.mp && <StakedNftItem key={key} address={nft.collection} claimable ={nft.claimable} id={nft.tokenId} mp ={nft.mp} stakedDate={nft.stakedTimeStamp} claimedDate={nft.claimedTimeStamp} newtrons={nft.newtrons}/>
                  ))
                }
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StakedNfts;
