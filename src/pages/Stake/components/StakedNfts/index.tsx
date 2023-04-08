import { useState, useEffect } from "react";
import { Box, Container, Typography, Table, TableBody } from "@mui/material";
import Select from "react-select";
import StakedNftItem from "./StakedNftItem";
import { useAddress, useWeb3Context } from "../../../../hooks";
import { AppDispatch } from "state";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./staked-nfts.scss";
import { getStakedNftsFromUser } from "store/slice/nft-slice";
import { IReduxState } from "store/slice/state.interface";
import getDateFromTimestamp from "utils/getDate";
import { BigNumber } from "ethers";

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

const StakedNfts = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedOption, setSelectedOption] = useState<any>({
    value: "All NFT's",
    label: "All NFT's",
  });

  const { connect } = useWeb3Context();
  
  const stakedNftFromUser = useSelector<IReduxState, Array<{collection : string, tokenId : number, newtrons : number, protons : number, mp : number, stakedTimeStamp : number, claimedTimeStamp : number, claimable : boolean}>>(state => {
    if (state.nft) {
      return state.nft.StakedNftsFromUser;
    }
    return [];
  });

  const update = useSelector<IReduxState, Boolean>(state => {
    return state.nft.update
  })

  const address = useAddress();

  const { provider, chainID, connected } = useWeb3Context();

  async function getCurrentlyStakedNfts(address : string) {
    await dispatch(
      getStakedNftsFromUser({
        provider,
        networkID: chainID,
        walletAddress : address
      })
    )
  }

  useEffect(() => {
    if (address) {
      getCurrentlyStakedNfts(address);
    }
  }, [connect]);

  useEffect(() => {
    if (address) {
      getCurrentlyStakedNfts(address);
    }
  }, [update]);

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
                {stakedNftFromUser.map((nft, key) => (
                  <StakedNftItem key={key} address={nft.collection} id={nft.tokenId} stakedDate={getDateFromTimestamp(nft.stakedTimeStamp)} newtrons={nft.newtrons}/>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StakedNfts;
