import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  TableFooter,
} from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";

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
              <Link to="/">
                <Button color="inherit" sx={{ color: "white" }}>
                  Home
                </Button>
              </Link>

              <Link to="/about">
                <Button color="inherit" sx={{ color: "white" }}>
                  About Us
                </Button>
              </Link>

              <Link to="/contact">
                <Button color="inherit" sx={{ color: "white" }}>
                  Contact
                </Button>
              </Link>
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
          <Link to="https://www.facebook.com/">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#3b5998", color: "#fff" }}
              startIcon={<i className="fab fa-facebook-f"></i>}
            >
              Facebook
            </Button>
          </Link>
          <Link to="https://www.twitter.com/">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#55acee", color: "#fff" }}
              startIcon={<i className="fab fa-twitter"></i>}
            >
              Twitter
            </Button>
          </Link>

          <Link to="https://www.google.com/">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#dd4b39", color: "#fff" }}
              startIcon={<i className="fab fa-google"></i>}
            >
              Google
            </Button>
          </Link>
        </Stack>
      </TableFooter>
    </div>
  );
};

export default Layout;
