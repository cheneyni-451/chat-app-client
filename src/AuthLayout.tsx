import { Grid } from "@mui/material";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Outlet />
    </Grid>
  );
}
