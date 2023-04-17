import { Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  TableFooter,
} from "@mui/material";
import DirectionsTransitFilledTwoToneIcon from "@mui/icons-material/DirectionsTransitFilledTwoTone";

const Layout = () => {
  var today = new Date();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F6F1F1",
      }}
    >
      <div style={{ flexGrow: "1" }}>
        <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <DirectionsTransitFilledTwoToneIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              E-Commune
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button color="inherit">Home</Button>
              <Button color="inherit">About Us</Button>
              <Button color="inherit">Contact</Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
      <Outlet />
      <TableFooter
        sx={{
          backgroundColor: "#3f51b5",
          color: "#fff",
          textAlign: "center",
          display: "block",
        }}
      >
        <p>Copyright &copy; E-Commune {today.getFullYear()}</p>
      </TableFooter>
    </div>
  );
};

export default Layout;
