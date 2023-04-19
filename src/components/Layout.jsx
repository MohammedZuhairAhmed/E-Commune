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
        <AppBar position="static" sx={{ backgroundColor: "#333" }}>
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
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center",
          display: "block",
        }}
      >
        <p style={{ margin: "1rem" }}>
          &copy; E-Commune {today.getFullYear()} | All Rights Reserved
        </p>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3b5998", color: "#fff" }}
            startIcon={<i className="fab fa-facebook-f"></i>}
          >
            Facebook
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#55acee", color: "#fff" }}
            startIcon={<i className="fab fa-twitter"></i>}
          >
            Twitter
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#dd4b39", color: "#fff" }}
            startIcon={<i className="fab fa-google"></i>}
          >
            Google
          </Button>
        </Stack>
      </TableFooter>
    </div>
  );
};

export default Layout;
