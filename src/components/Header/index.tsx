import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Link,
  Box,
  Button,
  Menu,
  MenuItem,
  Container,
  Tooltip,
} from "@mui/material";

import useResponsive from "../../hooks/useResponsive";
import MenuIcon from "@mui/icons-material/Menu";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import DiscordIcon from "assets/images/discord-brands.svg";
import LogoImage from "assets/images/logo.png";
import MobileLogoImage from "assets/images/mobile_logo.png";
import "./header.scss";

import Web3Status from "components/Web3Status";

const menuLists = [
  {
    link: "/stake",
    text: "Staking (Profile)",
  },
  {
    link: "",
    text: "Why Neutron?",
  },
  {
    link: "",
    text: "The Grand Design",
  },
  {
    link: "/mining-points",
    text: "NFT Mining Points",
  },
  {
    link: "",
    text: "Tokenomics",
  },
  {
    link: "",
    text: "Lottery Marketplace",
  },
  {
    link: "",
    text: "Neutron NFT's",
  },
];

const Header = () => {
  const history = useHistory();
  const isMobile = useResponsive("down", "sm");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenu = (link: string) => {
    handleCloseUserMenu();
    history.push(link);
  };

  return (
    <AppBar
      position="static"
      className="appbar"
      sx={{ backgroundColor: "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", columnGap: "8px" }}
        >
          <Link component={NavLink} to="/" underline="none" height="48px">
            <Box
              component="img"
              src={isMobile ? MobileLogoImage : LogoImage}
              width={isMobile ? "60px" : "160px"}
              height="100%"
              alt="logo"
            />
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
            <Box
              className="social-buttons"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Button
                href="https://twitter.com/@neutronminer"
                target="_blank"
                rel="noreferrer"
                className="social-button"
                variant="contained"
                sx={{
                  background: "rgb(29, 26, 21)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  '&:hover': {background: "rgb(43, 42, 42)"}                  
                }}
              >
                <TwitterIcon sx={{ color: "#fff" }} />
              </Button>
              <Button
                href="https://t.me/neutronnft"
                target="_blank"
                rel="noreferrer"
                className="social-button"
                variant="contained"
                sx={{
                  background: "rgb(29, 26, 21)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  '&:hover': {background: "rgb(43, 42, 42)"}                  
                }}
              >
                <TelegramIcon sx={{ color: "#fff" }} />
              </Button>
              <Button
                href="https://discord.gg/4MKTmJXXby"
                target="_blank"
                rel="noreferrer"
                className="social-button"
                variant="contained"
                sx={{
                  background: "rgb(29, 26, 21)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  '&:hover': {background: "rgb(43, 42, 42)"}                  
                }}
              >
                <Box component="img" src={DiscordIcon} alt="" />
              </Button>
            </Box>
            <Web3Status />
            <Tooltip title="Open Menu">
              <Button
                onClick={handleOpenUserMenu}
                className="menu-button"
                variant="contained"
                sx={{                  
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  '&:hover': {background: "rgb(43, 42, 42)"}                  
                }}
              >
                <MenuIcon sx={{ color: "#fff" }} />
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menuLists.map((list, key) => (
                <MenuItem key={key} onClick={() => handleClickMenu(list.link)}>
                  {list.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
