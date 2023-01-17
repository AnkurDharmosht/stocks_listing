import React from "react";
import { Grid, ThemeProvider } from "@mui/material";

const InnerHeader = ({ children }) => {
  return (
    <Grid container sx={{ mb: 8 }}>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "0px -2px 10px -3px rgba(59, 59, 59, 0.85)",
          width: "100%",
          zIndex: "2",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default InnerHeader;
