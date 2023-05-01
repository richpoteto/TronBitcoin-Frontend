import { useState, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import Slider from "react-slick";
import Item from "components/Item";
import useResponsive from "../../../../hooks/useResponsive";
import nftImage1 from "assets/images/item/1 snowman epiphany.png";
import nftImage7 from "assets/images/recent-item/7 tpunk 3442.png";
import "./action-feed.scss";

const settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  // autoplay: true,
  arrows: false,
  autoplaySpeed: 2000,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface IActionFeed {
  rareNfts: Array<any>;
  currentNfts: Array<any>;
  messages: Array<string>;
}

const ActionFeed = ({ rareNfts, currentNfts, messages }: IActionFeed) => {
  const isMobile = useResponsive("down", "md");
  const [isRare, setIsRare] = useState(true);  

  const handleClick = useCallback((value) => {
    setIsRare(value);
  }, [])
  
  console.log(rareNfts, 111111);

  const showNfts = rareNfts
    .map((nft, index) => {
      if (parseInt(nft.collection)) {
        return {
          image: nftImage1,
          nftName: nft.nftName,
          collectionName: nft.nftName,
          nftId: nft.tokenId,
          rank: nft.mp,
          verified: true,
          miningPoint: nft.mp.toString(),
          minintPointColor: "#ff7523",
          buttonText: "MP: " + nft.mp,
          buttonSubText: "450 N/HR",
        };
      } else {
        return null;
      }
    })
    .filter((nft) => nft !== null);

  const sliderItems = showNfts.map((item, key) => {
    return (
      item && (
        <Item
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
      )
    );
  });

  let length = sliderItems.length;

  if (length < 7) {
    for (let i = 0; i < 7 - length; i++) {
      sliderItems.push(<div />);
    }
  }

  const stakedshowNfts = currentNfts
    .map((nft, index) => {
      if (parseInt(nft.collection)) {
        return {
          image: nftImage7,
          nftName: nft.nftName,
          collectionName: nft.nftName,
          nftId: nft.tokenId,
          rank: nft.mp,
          verified: true,
          miningPoint: nft.mp.toString(),
          minintPointColor: "#ff7523",
          buttonText: "MP: " + nft.mp,
          buttonSubText: "450 N/HR",
        };
      } else {
        return null;
      }
    })
    .filter((nft) => nft !== null);

  const stakedsliderItems = stakedshowNfts.map((item, key) => {
    return (
      item && (
        <Item
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
      )
    );
  });

  let stakedlength = stakedsliderItems.length;

  if (stakedlength < 7) {
    for (let i = 0; i < 7 - stakedlength; i++) {
      stakedsliderItems.push(<div />);
    }
  }

  return (
    <Box
      className="action-feed-container"
      flexGrow="1"
      sx={{
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box>
        <Typography
          fontFamily="Audiowide"
          fontSize="20px"
          mt="8px"
          mb="30px"
          className="action-feed-desc-title"
          color="white"
        >
          Action Feed
        </Typography>
        <Box
          className="action-feed-desc"
          height="360px"
          border="1px solid rgb(43, 42, 40)"
          sx={{
            maxWidth: { xs: "100%", md: "300px" },
            backgroundColor: "rgb(20, 18, 15)",
          }}
        >
          {messages.map((message, index) => (
            <Typography variant="inherit" fontFamily="LucidaSans" mb="8px">
              <Typography
                component="span"
                fontFamily="LucidaSans"
                color="primary.white"
                sx={{
                  wordBreak: "break-all",
                }}
              >
                {message}
              </Typography>{" "}
            </Typography>
          ))}
        </Box>
      </Box>      
      <Box
        className="action-feed-main"
        sx={{
          width: { xs: "100%", md: 0 },
        }}
      >        
        <Box display="flex" justifyContent="flex-start">
          <Button
            sx={{
              fontFamily: "Audiowide",
              color: isRare? "rgb(255, 184, 0)" : "rgb(120, 120, 120)",
              fontSize: "14px",
              p: "10px 20px",
              borderRadius: "8px",
              mb: "20px",
              mr: "8px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: isRare? "rgb(29, 26, 21)" : "transparent",
              mt: isMobile ? "16px" : "0",
            }}
            onClick={() => handleClick(true)}
          >
            Rare NFT's Currently Mining
          </Button>
          <Button
            sx={{
              fontFamily: "Audiowide",
              color: !isRare? "rgb(255, 184, 0)" : "rgb(120, 120, 120)",
              fontSize: "14px",
              p: "10px 20px",
              borderRadius: "8px",
              mb: "20px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: isRare? "transparent" : "rgb(29, 26, 21)",
              mt: isMobile ? "16px" : "0",
            }}
            onClick={() => handleClick(false)}
          >
            Most Recently Staked NFT's
          </Button>
        </Box>
        <Box
          className="slider-content"
          border="1px solid rgb(43, 42, 40)"
          sx={{ backgroundColor: "rgb(20, 18, 15)", height: 360 }}
        >
          {isRare && <Slider {...settings}>{sliderItems}</Slider>}
          {!isRare && <Slider {...settings}>{stakedsliderItems}</Slider>}
        </Box>
      </Box>
    </Box>
  );
};

export default ActionFeed;
