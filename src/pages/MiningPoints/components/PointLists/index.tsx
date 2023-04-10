import {
  Box,
  Button,
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
import { NavLink } from "react-router-dom";
import { useRef } from "react"

import HomeIcon from '@mui/icons-material/Home';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';

import tpunk1Image from "assets/images/tpunk1.png";
import tpunk2Image from "assets/images/tpunk2.png";
import tpunk3Image from "assets/images/tpunk3.png";

import PickAxeImage from "assets/images/pngegg.png";
import SheetImage from "assets/images/googlesheets.png";



import "./point-lists.scss";
import { useToggleVoteModal } from '../../../../state/application/hooks';

const scrollToRef = (ref: any) => window.scrollTo(0, ref.current.offsetTop)   

const PointLists = () => {

  const myRef = useRef(null)
  const myRef2 = useRef(null)
  const executeScroll = (ref: any) => scrollToRef(ref)

  return (
    <Box sx={{ backgroundColor: "primary.main" }}>
      <Container maxWidth="xl" sx={{ py: "24px" }}>
        <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: 'flex-start', mb: {xs: '24px', sm: '36px'}, flexDirection: {xs: 'column', lg: 'row'}}}>          
          <Typography
            variant="h4"
            fontFamily="Audiowide"            
            textAlign="center"
            sx={{border: {xs: 1, md: 2}, maxWidth: {xs: '240px', md: '300px'}, px: '10px', py: '4px', mb: {xs: '16px', lg: '0'}, fontSize: {xs: '24px', md: '32px'}}}            
          >
            Mining Points
          </Typography>
          <Box sx={{display: "flex", justifyContent: 'space-between'}}>            
            <Button className="collection-wrap" onClick={() =>executeScroll(myRef)}>
              Big NFT Collections
            </Button>   
            <Button className="collection-wrap" sx={{ml: '12px'}} onClick={() =>executeScroll(myRef2)}>
              Kraftly Collections
            </Button>
            <Button className="collection-wrap" sx={{ml: '12px'}} onClick={() =>executeScroll(myRef2)}>
              Uswap Collections
            </Button>             
          </Box>
        </Box>

        <Box sx={{display: "flex", justifyContent: 'space-between', flexDirection: {xs: 'column', lg: 'row'}}}>
          <Box>
            <Typography
              fontSize="14px"              
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto", color: 'white' }}
            >
              Base Mining Points:
            </Typography>
            <Typography
              fontSize="14px"
              mb="16px"
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto" }}
            >
              is calculated based off the
              mint cost and total supply of a collection.
            </Typography>
          </Box>
          <Box>
            <Typography
              fontSize="14px"              
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto", color: 'white' }}
            >
              Featured Collections:
            </Typography>
            <Typography
              fontSize="14px"
              mb="16px"
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto" }}
            >
              Some collections are featured by the Neutron team. Some of these collections are given higher 
              Mining Points, or will be advertised on our site.                    
            </Typography>

            {/* <Typography
              fontSize="14px"              
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto", color: 'white' }}
            >
              Rarity Rank Multiplier:
            </Typography>
            <Typography
              fontSize="14px"
              mb="16px"
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto" }}
            >
              is calculated off how rare the individual NFT is in the collection.              
            </Typography>            
            <TableContainer component={Paper} sx={{background: 'none', boxShadow: 'none', mb: {xs: '16px', lg: '0'}}}>
              <Table size="small" sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, mx: "auto" }}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#ff9900", fontFamily: "Audiowide" }}>
                      Bonus Rarity Rank Multiplier:
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#e69138", fontFamily: "Audiowide" }}>
                      Top 1% = BMP * 30
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#f1c232", fontFamily: "Audiowide" }}>
                      Top 2-4% = BMP * 10
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#674ea7", fontFamily: "Audiowide" }}>
                      Top 5-9% = BMP * 5
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#3d85c6", fontFamily: "Audiowide" }}>
                      Top 10-24% = BMP * 2
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "#6aa84f", fontFamily: "Audiowide" }}>
                      Top 25-100% = Only BMP
                    </TableCell>
                  </TableRow>                  
                </TableBody>
              </Table>
            </TableContainer> */}
          </Box>
          <Box>
            <Typography
              fontSize="14px"              
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto", color: 'white' }}
            >
              Highest Mining Points:
            </Typography>
            <Typography
              fontSize="14px"
              mb="16px"
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto" }}
            >
              Highest Mining Points: The Big NFT Collections will have a lottery each month to select 
              a certain number of NFTs in each collection to receive the Highest Mining Points for that 
              collections.                    
            </Typography>
          </Box>
          <Box>
            <Typography
              fontSize="14px"              
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto", color: 'white' }}
            >
              Collection Mining Points:
            </Typography>
            <Typography
              fontSize="14px"
              mb="16px"
              sx={{ maxWidth: {sm: '600px', md: '900px', lg: "300px"}, fontFamily: "Audiowide", mx: "auto" }}
            >
              This represents the total amount of all the mining points in that collection.                    
            </Typography>
          </Box>
        </Box>        
      </Container>
      <Box sx={{backgroundColor: '#791dba'}}>
        <Container maxWidth="xl" sx={{ py: "32px", overflowX: 'auto'}}>        
          <Typography
            id='bignftcollections'
            ref={myRef }
            variant="h4"
            fontFamily="Audiowide"            
            textAlign="center"
            sx={{border: {xs: 1, md: 2}, maxWidth: '320px', px: '10px', py: '4px', mb: {xs: '16px'}, fontSize: {xs: '20px', sm: '24px'}}}            
          >
            Big NFT Collections
          </Typography>          
          <Table size="small" sx={{ minWidth: '1200px', mx: "auto", borderCollapse: 'separate', borderSpacing: '0 12px' }}>
            <TableBody>
              <TableRow>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", fontFamily: "Audiowide", color: 'white'}}>
                  Collection
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", width: '18%', fontFamily: "Audiowide", color: 'white'}}>
                  Base Mining Points
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", width: '18%', fontFamily: "Audiowide", color: 'white'}}>
                  Monthly Lottery Selected
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", width: '18%', fontFamily: "Audiowide", color: 'white'}}>
                  Highest Mining Points
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", width: '18%', fontFamily: "Audiowide", color: 'white'}}>
                  Collection Mining Points
                </TableCell>
              </TableRow>
              <TableRow sx={{backgroundColor: 'white', borderRadius: '16px', py: '2px'}}>
                <TableCell sx={{borderBottom: 'none', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', borderLeftStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Typography sx={{fontFamily: "Audiowide", fontSize: '14px'}}>
                        BAYCTRONICS  
                      </Typography>  
                      <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <HomeIcon sx={{ml: '10px'}}/>
                        <TwitterIcon sx={{ml: '10px'}}/>
                        <TelegramIcon sx={{ml: '10px'}}/>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: '0.5'}}>
                      <Box component="img" src={tpunk1Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk2Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk3Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                    </Box>
                  </Box>                                    
                </TableCell>
                <TableCell sx={{borderBottom: 'none', position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start' }}>
                      <Typography sx={{fontFamily: "Audiowide", ml: '48px'}}>
                        300  
                      </Typography>  
                      <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                        <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                      </Box>
                    </Box>
                    {/* <Box sx={{display: 'flex', alignItems: 'center', ml: '32px'}}>
                      <Box component="img" src={SheetImage} alt="logo" sx={{width: '60px', height: '64px'}} />
                    </Box> */}
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontFamily: "Audiowide", textAlign: 'center', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  N/A
                </TableCell>
                <TableCell sx={{borderBottom: 'none', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      9000  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', borderRightStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      1,500,300
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>                
              </TableRow>
              <TableRow sx={{backgroundColor: 'white', borderRadius: '16px', py: '2px'}}>
                <TableCell sx={{borderBottom: 'none', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', borderLeftStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Typography sx={{fontFamily: "Audiowide", fontSize: '14px'}}>
                        Tpunks  
                      </Typography>  
                      <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <HomeIcon sx={{ml: '10px'}}/>
                        <TwitterIcon sx={{ml: '10px'}}/>
                        <TelegramIcon sx={{ml: '10px'}}/>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: '0.5'}}>
                      <Box component="img" src={tpunk1Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk2Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk3Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                    </Box>
                  </Box>                                    
                </TableCell>
                <TableCell sx={{borderBottom: 'none', position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start' }}>
                      <Typography sx={{fontFamily: "Audiowide", ml: '48px'}}>
                        200  
                      </Typography>  
                      <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                        <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                      </Box>
                    </Box>
                    {/* <Box sx={{display: 'flex', alignItems: 'center', ml: '32px'}}>
                      <Box component="img" src={SheetImage} alt="logo" sx={{width: '60px', height: '64px'}} />
                    </Box> */}
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontFamily: "Audiowide", textAlign: 'center', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  N/A
                </TableCell>
                <TableCell sx={{borderBottom: 'none', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      6000  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', borderRightStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      3,992,000
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>                
              </TableRow>
              <TableRow sx={{backgroundColor: 'white', borderRadius: '16px', py: '2px'}}>
                <TableCell sx={{borderBottom: 'none', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', borderLeftStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Typography sx={{fontFamily: "Audiowide", fontSize: '14px'}}>
                        Tron Meebits
                      </Typography>  
                      <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <HomeIcon sx={{ml: '10px'}}/>
                        <TwitterIcon sx={{ml: '10px'}}/>
                        <TelegramIcon sx={{ml: '10px'}}/>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: '0.5'}}>
                      <Box component="img" src={tpunk1Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk2Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk3Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                    </Box>
                  </Box>                                    
                </TableCell>
                <TableCell sx={{borderBottom: 'none', position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                    <Typography sx={{fontFamily: "Audiowide", ml: '48px'}}>
                      100  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontFamily: "Audiowide", textAlign: 'center', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  N/A
                </TableCell>
                <TableCell sx={{borderBottom: 'none', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      100  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', borderRightStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      2,000,000
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>                
              </TableRow>
              <TableRow sx={{backgroundColor: 'white', borderRadius: '16px', py: '2px'}}>
                <TableCell sx={{borderBottom: 'none', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', borderLeftStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Typography sx={{fontFamily: "Audiowide", fontSize: '14px'}}>
                        BATC  
                      </Typography>  
                      <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <HomeIcon sx={{ml: '10px'}}/>
                        <TwitterIcon sx={{ml: '10px'}}/>
                        <TelegramIcon sx={{ml: '10px'}}/>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: '0.5'}}>
                      <Box component="img" src={tpunk1Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk2Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk3Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                    </Box>
                  </Box>                                    
                </TableCell>
                <TableCell sx={{borderBottom: 'none', position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start' }}>
                      <Typography sx={{fontFamily: "Audiowide", ml: '48px'}}>
                        100  
                      </Typography>  
                      <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                        <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                      </Box>
                    </Box>
                    {/* <Box sx={{display: 'flex', alignItems: 'center', ml: '32px'}}>
                      <Box component="img" src={SheetImage} alt="logo" sx={{width: '60px', height: '64px'}} />
                    </Box> */}
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontFamily: "Audiowide", textAlign: 'center', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  N/A
                </TableCell>
                <TableCell sx={{borderBottom: 'none', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      3000  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', borderRightStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      1,998,400
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>                
              </TableRow>                                      
            </TableBody>
          </Table>
          <Box sx={{minWidth: '1200px', display: 'flex', justifyContent: 'flex-start', py: '20px', px: '20px', alignItems: 'center', fontFamily: "Audiowide", borderRadius: '16px', backgroundColor: 'white'}}>
            <Typography sx={{fontFamily: "Audiowide", fontSize: '24px'}}>
              Request a New Tron NFT Collection
            </Typography> 
            <Box sx={{backgroundColor: '#6164ff', border: 1, color: 'white', ml: '100px', py: '8px', px: '6px', borderRadius: '5px' }}>
              Request
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{backgroundColor: '#f59b2f'}}>
        <Container maxWidth="xl" sx={{ py: "32px", overflowX: 'auto'}}>        
          <Typography
            variant="h4"
            fontFamily="Audiowide"            
            textAlign="center"
            sx={{border: {xs: 1, md: 2}, mx: 'auto', maxWidth: '320px', px: '10px', py: '4px', mb: {xs: '16px'}, fontSize: {xs: '20px', sm: '24px'}}}            
            id="kraftlycollections"
            ref={myRef2}
          >
            Kraftly Collections
          </Typography>          
          <Table size="small" sx={{ minWidth: '1200px', mx: "auto", borderCollapse: 'separate', borderSpacing: '0 12px' }}>
            <TableBody>
              <TableRow>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", fontFamily: "Audiowide", color: 'white'}}>
                  Collection
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", width: '18%', fontFamily: "Audiowide", color: 'white'}}>
                  Base Mining Points
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", width: '18%', fontFamily: "Audiowide", color: 'white'}}>
                  Rarity Rank Multiplier
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", width: '18%', fontFamily: "Audiowide", color: 'white'}}>
                  Highest Mining Points
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontSize: "14px", width: '18%', fontFamily: "Audiowide", color: 'white'}}>
                  Collection Mining Points
                </TableCell>
              </TableRow>
              <TableRow sx={{backgroundColor: 'white', borderRadius: '16px', py: '2px'}}>
                <TableCell sx={{borderBottom: 'none', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', borderLeftStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Typography sx={{fontFamily: "Audiowide", fontSize: '14px'}}>
                        Snowmen of Knoff
                      </Typography>  
                      <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <HomeIcon sx={{ml: '10px'}}/>
                        <TwitterIcon sx={{ml: '10px'}}/>
                        <TelegramIcon sx={{ml: '10px'}}/>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: '0.5'}}>
                      <Box component="img" src={tpunk1Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk2Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk3Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                    </Box>
                  </Box>                                    
                </TableCell>
                <TableCell sx={{borderBottom: 'none', position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start' }}>
                      <Typography sx={{fontFamily: "Audiowide", ml: '48px'}}>
                        1,000  
                      </Typography>  
                      <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                        <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '32px'}}>
                      <Box component="img" src={SheetImage} alt="logo" sx={{width: '60px', height: '64px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontFamily: "Audiowide", textAlign: 'center', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  Full Collection Ranked
                </TableCell>
                <TableCell sx={{borderBottom: 'none', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      15,000  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', borderRightStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      499,000
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>                
              </TableRow>
              <TableRow sx={{backgroundColor: 'white', borderRadius: '16px', py: '2px'}}>
                <TableCell sx={{borderBottom: 'none', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', borderLeftStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Typography sx={{fontFamily: "Audiowide", fontSize: '14px'}}>
                        Lost Marbles
                      </Typography>  
                      <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <HomeIcon sx={{ml: '10px'}}/>
                        <TwitterIcon sx={{ml: '10px'}}/>
                        <TelegramIcon sx={{ml: '10px'}}/>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: '0.5'}}>
                      <Box component="img" src={tpunk1Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk2Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk3Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                    </Box>
                  </Box>                                    
                </TableCell>
                <TableCell sx={{borderBottom: 'none', position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start' }}>
                      <Typography sx={{fontFamily: "Audiowide", ml: '48px'}}>
                        100  
                      </Typography>  
                      <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                        <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '32px'}}>
                      <Box component="img" src={SheetImage} alt="logo" sx={{width: '60px', height: '64px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontFamily: "Audiowide", textAlign: 'center', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  Full Collection Ranked
                </TableCell>
                <TableCell sx={{borderBottom: 'none', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      6,000  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', borderRightStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      224,700
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>                
              </TableRow>
              <TableRow sx={{backgroundColor: 'white', borderRadius: '16px', py: '2px'}}>
                <TableCell sx={{borderBottom: 'none', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', borderLeftStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Typography sx={{fontFamily: "Audiowide", fontSize: '14px'}}>
                        Ambitious Motion Cards
                      </Typography>  
                      <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <HomeIcon sx={{ml: '10px'}}/>
                        <TwitterIcon sx={{ml: '10px'}}/>
                        <TelegramIcon sx={{ml: '10px'}}/>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: '0.5'}}>
                      <Box component="img" src={tpunk1Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk2Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk3Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                    </Box>
                  </Box>                                    
                </TableCell>
                <TableCell sx={{borderBottom: 'none', position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                    <Typography sx={{fontFamily: "Audiowide", ml: '48px'}}>
                      1,000  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontFamily: "Audiowide", textAlign: 'center', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  Full Collection Ranked
                </TableCell>
                <TableCell sx={{borderBottom: 'none', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      6,000  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', borderRightStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      37,000
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>                
              </TableRow>
              <TableRow sx={{backgroundColor: 'white', borderRadius: '16px', py: '2px'}}>
                <TableCell sx={{borderBottom: 'none', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', borderLeftStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      <Typography sx={{fontFamily: "Audiowide", fontSize: '14px'}}>
                        Baby Turu
                      </Typography>  
                      <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <HomeIcon sx={{ml: '10px'}}/>
                        <TwitterIcon sx={{ml: '10px'}}/>
                        <TelegramIcon sx={{ml: '10px'}}/>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: '0.5'}}>
                      <Box component="img" src={tpunk1Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk2Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                      <Box component="img" src={tpunk3Image} alt="logo" sx={{width: '60px', height: '60px', ml: '12px', border: 1, borderRadius: '12px'}} />
                    </Box>
                  </Box>                                    
                </TableCell>
                <TableCell sx={{borderBottom: 'none', position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start' }}>
                      <Typography sx={{fontFamily: "Audiowide", ml: '48px'}}>
                        1,000  
                      </Typography>  
                      <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                        <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '32px'}}>
                      <Box component="img" src={SheetImage} alt="logo" sx={{width: '60px', height: '64px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', fontFamily: "Audiowide", textAlign: 'center', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  Full Collection Ranked
                </TableCell>
                <TableCell sx={{borderBottom: 'none', 
                  position: 'relative', 
                  ":after": {
                    content: "''",
                    position: 'absolute', top: '3px', bottom: '3px', right: '3px', width: '2px', backgroundColor: 'black'
                  }
                }}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      5,000  
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{borderBottom: 'none', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', borderRightStyle: 'none'}}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: "Audiowide"}}>
                      278,000
                    </Typography>  
                    <Box sx={{display: 'flex', alignItems: 'center', ml: '5px'}}>
                      <Box component="img" src={PickAxeImage} alt="logo" sx={{width: '16px', height: '16px'}} />
                    </Box>
                  </Box>
                </TableCell>                
              </TableRow>                                      
            </TableBody>
          </Table>
          <Box sx={{minWidth: '1200px', display: 'flex', justifyContent: 'flex-start', py: '20px', px: '20px', alignItems: 'center', fontFamily: "Audiowide", borderRadius: '16px', backgroundColor: 'white'}}>
            <Typography sx={{fontFamily: "Audiowide", fontSize: '24px'}}>
              Request a New Tron NFT Collection
            </Typography> 
            <Box sx={{backgroundColor: '#6164ff', border: 1, color: 'white', ml: '100px', py: '8px', px: '6px', borderRadius: '5px' }}>
              Request
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PointLists;
