import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useStyles from "../assets/styles";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
//img
const DashboardPage = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box className={classes.home}>
      <Box component="section" className={isMobile ? "hero mobile" : "hero"}>
        <Container>
          <Grid container spacing={5} justifyContent="center">
            <Grid item md={10} xs={12}>
              <Stack>
                <Typography color="white" variant="h6">
                  Dashboard Page
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
