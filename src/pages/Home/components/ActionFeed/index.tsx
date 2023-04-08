import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import Item from "components/Item";
import nftImage1 from "assets/images/item/1 snowman epiphany.png";
import nftImage2 from "assets/images/item/2 robotron.png";
import nftImage3 from "assets/images/item/3 tpunk 3442.png";
import nftImage4 from "assets/images/item/4 justin baby turu.png";
import nftImage5 from "assets/images/item/5 justBAYC ape 4951.png";
import "./action-feed.scss";
import { useEffect, useState } from "react";
import { setFeeds } from "store/slice/feeds-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state";
import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";

const settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  // autoplay: true,
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
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface IActionFeed {
  nfts: Array<any>
}

const ActionFeed = ({ nfts }: IActionFeed) => {
  const dispatch = useDispatch<AppDispatch>();
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [messages, setMessages] = useState<Array<string>>([]);

  useEffect(() => {
    const prevMessages = localStorage.getItem("messages");
    if (prevMessages) {
      setMessages(JSON.parse(prevMessages));
    }
  }, [])

  const showNfts = nfts.map((nft, index) => {
    if (parseInt(nft.collection)) {
      return {
        image: nftImage1,
        nftName: "Ghostface Gen 2",
        collectionName: "Ghostface",
        nftId: nft.tokenId,
        rank: 5063,
        verified: true,
        miningPoint: nft.mp.toString(),
        minintPointColor: "#ff7523",
        buttonText: "MP: 6000",
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
      sliderItems.push(<div />);
    }
  }

  return (
    <Box
      className="action-feed-container"
      sx={{
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        className="action-feed-desc"
        sx={{
          mb: { xs: "24px", md: 0 },
          mt: { xs: 0, md: "38px" },
          maxWidth: { xs: "100%", md: "300px" },
          backgroundColor: "primary.light",
        }}
      >
        <Box
          className="action-feed-desc-content"
          sx={{ backgroundColor: "common.black" }}
        >
          <Typography
            variant="h2"
            fontFamily="Audiowide"
            fontSize="20px"
            mb="24px"
            className="action-feed-desc-title"
          >
            Action Feed:
          </Typography>
          {
            messages.map((message, index) =>
              <Typography variant="inherit" fontFamily="LucidaSans" mb="8px">
                <Typography
                  component="span"
                  fontFamily="LucidaSans"
                  color="primary.dark"
                  sx={{
                    wordBreak: 'break-all'
                  }}
                >
                  {message}
                </Typography>{" "}
              </Typography>
            )
          }
        </Box>
      </Box>
      <Box
        className="action-feed-main"
        sx={{
          width: { xs: "100%", md: 0 },
        }}
      >
        <Typography
          fontFamily="Audiowide"
          color="white"
          fontSize="20px"
          mb="8px"
        >
          Rare NFT's Currently Mining
        </Typography>
        <Box
          className="slider-content"
          sx={{ backgroundColor: "primary.light" }}
        >
          <Slider {...settings}>
            {
              sliderItems
            }
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default ActionFeed;
