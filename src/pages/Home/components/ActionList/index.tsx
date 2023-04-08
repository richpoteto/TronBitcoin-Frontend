import { Box, Typography } from "@mui/material";

import Slider from "react-slick";
import Item from "components/Item";
import NeutronLogo from "assets/images/neutron-logo.png";
import nftImage1 from "assets/images/recent-item/1 BAYCtron 1069.png";
import nftImage2 from "assets/images/recent-item/2 CoolCat 9464.png";
import nftImage3 from "assets/images/recent-item/3 TMEEBIT 1900.png";
import nftImage4 from "assets/images/recent-item/4 tpunk 332.png";
import nftImage5 from "assets/images/recent-item/5 tronbull 4120.png";
import nftImage6 from "assets/images/recent-item/6 tpunk 2484.png";
import nftImage7 from "assets/images/recent-item/7 tpunk 3442.png";
import "./action-list.scss";
import { useState } from "react";

const settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 7,
  slidesToScroll: 7,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

interface IActionList {
  nfts: Array<any>
}

const ActionList = ({ nfts }: IActionList) => {
  const showNfts = nfts.map((nft, index) => {
    if (parseInt(nft.collection)) {
      return {
        image: nftImage7,
        nftName: "Ghostface Gen 2",
        collectionName: "Ghostface",
        nftId: nft.tokenId,
        rank: 5063,
        verified: true,
        miningPoint: nft.mp.toString(),
        minintPointColor: "#ff7523",
        buttonText: "MP: " + nft.mp.toString(),
        buttonSubText: "450 N/HR",
      }
    } else {
      return null;
    }
  }
  )
    .filter((nft) => nft !== null);

  const sliderItems = showNfts.map((item, key) => {
    return item && <Item
      key={key}
      image={item.image}
      nftName={item.nftName}
      collectionName={item.collectionName}
      nftId={item.nftId}
      rank={item.rank}
      verified={item.verified}
      isSmall={true}
      miningPoint={item.miningPoint}
      minintPointColor={item.minintPointColor}
      buttonText={item.buttonText}
      buttonSubText={item.buttonSubText}
    />
  }
  )
  
  let length = sliderItems.length;

  if (length < 7) {
    for (let i = 0; i < 7 - length; i++) {
      sliderItems.push(<div/>);
    }
  }

  return (
    <Box className="action-list-container">
      <Box className="carousel-content">
        <Typography
          fontFamily="Audiowide"
          color="white"
          fontSize="20px"
          mb="8px"
        >
          Most Recently Staked NFT's
        </Typography>
        <Box
          className="carousel"
          sx={{
            backgroundColor: "primary.light",
          }}
        >
          <Slider {...settings}>
            {
              sliderItems
            }
          </Slider>
        </Box>
      </Box>
      <Box className="action-list-desc">
        <Typography variant="h3" className="action-list-desc-title">
          Let's get full picture...
        </Typography>
        <Box className="action-list-desc-item">
          <Box className="action-list-desc-icon">
            <Box component="img" src={NeutronLogo} />
          </Box>
          <Box>
            <Typography variant="h4" className="action-list-desc-subtitle">
              Mining Points
            </Typography>
            <Typography>
              Each NFT can mine Neutron at different rates based off the cost to
              mint the NFT and in some collections, the rarity of each
              individual NFT in that collection.
            </Typography>
          </Box>
        </Box>
        <Box className="action-list-desc-item">
          <Box className="action-list-desc-icon">
            <Box component="img" src={NeutronLogo} />
          </Box>
          <Box>
            <Typography variant="h4" className="action-list-desc-subtitle">
              Tokenomics
            </Typography>
            <Typography>
              We have set up a token supply that is in complete control of the
              users and benefits people who help build Neutron in its early
              stages! We have a 10-year mining plan in order to mine all
              21,000,000 Neutron tokens. Proton token mining is set up a little
              bit differently. Both Tokens can only be mined by staking NFT’s
              for time.
            </Typography>
          </Box>
        </Box>
        <Box className="action-list-desc-item">
          <Box className="action-list-desc-icon">
            <Box component="img" src={NeutronLogo} />
          </Box>
          <Box>
            <Typography variant="h4" className="action-list-desc-subtitle">
              Claiming and Withdraw Fees
            </Typography>
            <Typography>
              The fee's collected over time will allow for us to keep the
              project running and continue to build. We will be adding to swap
              liquidity, paying the running cost, artist and developers.
            </Typography>
          </Box>
        </Box>
        <Box className="action-list-desc-item">
          <Box className="action-list-desc-icon">
            <Box component="img" src={NeutronLogo} />
          </Box>
          <Box>
            <Typography variant="h4" className="action-list-desc-subtitle">
              Staking My NFT's
            </Typography>
            <Typography>
              Stake Popular Tron NFT's To Earn Neutron and Proton Tokens!
              Neutron tokens will be used in our upcoming Lottey Marketplace.
              Proton tokens will recieve a 1% weekly drop of any sale that
              occurs on the upcoming Lottey Marketplace and will be the only
              means to mint our upcoming NFT's.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ActionList;
