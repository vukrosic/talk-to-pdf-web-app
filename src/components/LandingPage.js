import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Snackbar } from "@mui/material";
import { styled } from "@mui/system";
// import PricingPlans from "./PricingPlans";
// import FAQ from "./FAQ";
// import Testimonials from "./Testimonials";

const useStyles = styled((theme) => ({
  mainContainer: {
    padding: theme.spacing(4),
  },
  headline: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
  subheadline: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  demoContainer: {
    textAlign: "center",
    margin: theme.spacing(4),
  },
  featureContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(4),
  },
  featureItem: {
    marginBottom: theme.spacing(2),
  },
  ctaContainer: {
    textAlign: "center",
    padding: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={12} className={classes.headline}>
        <Typography variant="h3">AI-Powered Coding Educator</Typography>
      </Grid>
      <Grid item xs={12} className={classes.subheadline}>
        <Typography variant="h5">Personalized Programming Curriculum based on Your Experience, Interests, and Goals</Typography>
      </Grid>
      <Grid item xs={12} className={classes.demoContainer}>
        {/* Insert interactive demo or video component */}
      </Grid>
      <Grid item xs={12} className={classes.featureContainer}>
        {/* List of key features mapped to Typography elements */}
        <Typography variant="body1" className={classes.featureItem}>Personalized Learning Paths</Typography>
        {/* More feature items... */}
      </Grid>
      {/* <Testimonials />
      <PricingPlans /> */}
      {/* <FAQ /> */}
      <Grid item xs={12} className={classes.ctaContainer}>
        <TextField label="Email Address" variant="outlined" />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => setSnackbarOpen(true)}
        >
          Subscribe Now
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          message="Thank you for subscribing!"
          onClose={handleSnackbarClose}
        />
      </Grid>
    </Grid>
  );
}

export default LandingPage;