import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo from "../assets/img/logo.png";
import BoomLogo from "../assets/img/boomlogo.png";
import useStyles from "../assets/styles";

const Footer = () => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <AppBar className={classes.footer} position="static" style={{ position: "absolute", bottom: "0px" }}>
            <Toolbar className="toolbar">
                <Container>
                    <Stack direction="row" spacing={3}>
                        <Box component="img" className="logo" src={Logo} alt="logo" />
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar >
    )
}

export default Footer;
