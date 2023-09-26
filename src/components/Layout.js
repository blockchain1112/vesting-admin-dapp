import React from 'react';
import Header from './Header';
import Footer from './Footer';
import useStyles from "../assets/styles";
import { Box } from '@mui/material';

const Layout = ({ children }) => {
    const classes = useStyles();
    return (
        <Box className={classes.base}>
            <Header />
            {children}
            {/* <Footer /> */}
        </Box>
    )
}
export default Layout;