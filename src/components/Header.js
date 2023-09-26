import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../assets/img/logo1.png";
import BoomLogo from "../assets/img/boomlogo.png";
// import Logo from "../assets/img/logo.svg";
import useStyles from "../assets/styles";

import Cwallet from "./Cwallet";
import { useWeb3React } from "@web3-react/core";
import { Divider, IconButton, Typography } from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import Config from "../config/app";

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery("(max-width:600px)");
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  // eslint-disable-next-line
  const {
    activate,
    active,
    account,
    deactivate,
    connector,
    error,
    setError,
    library,
  } = useWeb3React();

  const onConnectWallet = async () => {
    setIsOpenDialog(true);
  };

  const movePage = (link) => {
    for (let i = 0; i < 4; i++) {
      window.document
        .getElementsByClassName("header-button")
        [i].classList.remove("active");
    }
    window.document
      .getElementById(link.substr(1, link.length))
      .classList.add("active");
    navigate(link);
  };

  useEffect(() => {
    const load = async () => {
      const web3 = new Web3(library.provider);
      const TokenContract = new web3.eth.Contract(
        Config.BoomToken.abi,
        Config.BoomToken.address
      );
      const balance = await TokenContract.methods.balanceOf(account).call();
      console.log(balance);
      setTokenBalance(balance);
    };

    if (location.pathname === "/") {
      window.document.getElementById("vesting").classList.add("active");
    } else {
      window.document
        .getElementById(location.pathname.substr(1, location.pathname.length))
        ?.classList.add("active");
    }

    if (active) {
      load();
    } else {
      setTokenBalance(0);
    }
  }, [active, account]);
  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar className="toolbar">
        <Container>
          <Stack direction="row" spacing={3}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={3}
              onClick={() => navigate("/home")}
              sx={{ cursor: "pointer" }}
            >
              <Box component="img" className="logo" src={Logo} alt="logo" />
            </Stack>
          </Stack>
          {(() => {
            if (isMobile) {
              <>
                {active ? (
                  <Button
                    variant="contained"
                    onClick={onConnectWallet}
                    className="connect-button"
                  >
                    {account.substring(0, 3)} ...{" "}
                    {account.substring(account.length - 3)}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={onConnectWallet}
                    className="connect-button"
                  >
                    Connect
                  </Button>
                )}
              </>;
            } else {
              return (
                <Stack direction="row" spacing={1} className="header-buttons">
                  <Button
                    className="header-button"
                    id="dashboard"
                    onClick={() => movePage("/dashboard")}
                  >
                    Dashboard
                  </Button>
                  <Button
                    className="header-button"
                    id="swap"
                    onClick={() => movePage("/swap")}
                  >
                    Swap
                  </Button>
                  <Button
                    className="header-button"
                    id="staking"
                    onClick={() => movePage("/staking")}
                  >
                    Staking
                  </Button>

                  <Button
                    className="header-button"
                    id="vesting"
                    onClick={() => movePage("/vesting")}
                  >
                    Vesting
                  </Button>

                  {active ? (
                    <Button
                      variant="contained"
                      onClick={onConnectWallet}
                      sx={{ color: "white" }}
                      className="custom-button"
                    >
                      {account.substring(0, 3)} ...{" "}
                      {account.substring(account.length - 3)}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={onConnectWallet}
                      sx={{ color: "white" }}
                      className="custom-button"
                    >
                      Connect Wallet
                    </Button>
                  )}

                  <IconButton className="custom-button">
                    <DensityMediumIcon sx={{ color: "white" }} />
                  </IconButton>
                </Stack>
              );
            }
          })()}
          <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
