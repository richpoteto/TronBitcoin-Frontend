import {
  Box,
  Container,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import "./point-lists.scss";

interface MiningTypes {
  collection: string;
  mintPrice: number;
  baseMiningPoints: number;
  collectionId: number;
  collectionMP: number;
  contactAddress: string;
}

interface SpecCollection {
  collection: string;
  mintPrice: number;
  MpRange: string;
  collectionId: number;
  collectionMP: number;
  tokenRange: string;
}

const miningDatas: MiningTypes[] = [
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 245,
    baseMiningPoints: 54,
    collectionId: 55465,
    collectionMP: 7500000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 342,
    baseMiningPoints: 2435,
    collectionId: 4561,
    collectionMP: 6500000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 345,
    baseMiningPoints: 55,
    collectionId: 45000,
    collectionMP: 7600000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
  {
    collection: "TPunks",
    mintPrice: 1000,
    baseMiningPoints: 200,
    collectionId: 10000,
    collectionMP: 4200000,
    contactAddress: "TY2Fvs94C5JR261Q5mtEK9oM6Ak6oKy34R",
  },
];

const specCollectionDatas: SpecCollection[] = [
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
  {
    collection: "Tpandas",
    mintPrice: 15,
    MpRange: "1000~1400",
    collectionId: 69,
    collectionMP: 675,
    tokenRange: "5261~62620",
  },
];

const PointLists = () => {
  return (
    <Box sx={{ backgroundColor: "primary.main" }}>
      <Container maxWidth="xl" sx={{ py: "24px" }}>
        <Typography
          variant="h4"
          fontFamily="Audiowide"
          mb="16px"
          textAlign="center"
          sx={{ fontSize: { xs: "24px", md: "40px" } }}
        >
          Mining Points
        </Typography>
        <Typography textAlign="center" fontWeight="600" mb="16px">
          Two ways NFTs get mining points. 
        </Typography>
        <Box sx={{ display: "flex", gap: "24px" }}>
          <Box sx={{ width: "70%" }}>
            <Typography
              fontSize="14px"
              mb="16px"
              sx={{ maxWidth: "300px", mx: "auto" }}
            >
              <strong>Base Mining Points</strong> are calculated based off the
              mint cost of the collection.
            </Typography>
            <TableContainer component={Paper} sx={{ mb: "24px" }}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Collection</TableCell>
                    <TableCell>Mint Price</TableCell>
                    <TableCell>Base Mining Points</TableCell>
                    <TableCell># in Collection</TableCell>
                    <TableCell>Collection MP</TableCell>
                    <TableCell>Contract Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {miningDatas.map((data: MiningTypes, key: number) => (
                    <TableRow
                      key={key}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "action.hover",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{data.collection}</TableCell>
                      <TableCell>{data.mintPrice}</TableCell>
                      <TableCell>{data.baseMiningPoints}</TableCell>
                      <TableCell>{data.collectionId}</TableCell>
                      <TableCell>
                        {Intl.NumberFormat("en-US").format(data.collectionMP)}
                      </TableCell>
                      <TableCell>{data.contactAddress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small">
                <caption className="caption">
                  Kraftly Specific Collections
                </caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Collection</TableCell>
                    <TableCell>Mint</TableCell>
                    <TableCell>Base Mining Points</TableCell>
                    <TableCell>MP Range</TableCell>
                    <TableCell>Collection MP</TableCell>
                    <TableCell>Token Range</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {specCollectionDatas.map(
                    (data: SpecCollection, key: number) => (
                      <TableRow
                        key={key}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: "action.hover",
                          },
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{data.collection}</TableCell>
                        <TableCell>{data.mintPrice}</TableCell>
                        <TableCell>{data.MpRange}</TableCell>
                        <TableCell>{data.collectionId}</TableCell>
                        <TableCell>
                          {Intl.NumberFormat("en-US").format(data.collectionMP)}
                        </TableCell>
                        <TableCell>{data.tokenRange}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ width: "30%" }}>
            <Typography
              fontSize="14px"
              mb="16px"
              sx={{ maxWidth: "300px", mx: "auto" }}
            >
              <strong>Rarity Rank Multiplier:</strong> are calculated off how
              rare the individual NFT is in the collection.
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#ff9900" }}>
                      Bonus Rarity Rank Multiplier:
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#e69138" }}>
                      Top 1% = BMP * 30
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#f1c232" }}>
                      Top 2-4% = BMP * 10
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#674ea7" }}>
                      Top 5-9% = BMP * 5
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#3d85c6" }}>
                      Top 10-24% = BMP * 2
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#6aa84f" }}>
                      Top 25-100% = Only BMP
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "sdfsdf" }}>
                      Gold Represents Base Mining Points + Bonus Multiplier (min
                      top 100 ranked)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#f9cb9c" }}>
                      Green Represents Base Mining Points for Every NFT in
                      Collection
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#d9ead3" }}>
                      White Represents not yet assesed but Base Mining Points
                      for Every NFT in Collection
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#bb59ff" }}>
                      Purple Text Represents Featured Collection
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PointLists;
