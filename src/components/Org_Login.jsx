import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../api/axios";
import image from "../images/REG_LOGIN.png";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${image});
  background-size: cover;
  background-color: #f2f2f2;
  background-attachment: fixed;
`;
function Org_Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default form submission behavior

    try {
      const response = await axios.post(
        "/organization/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setEmail("");
      setPassword("");

      if (response.data._id) navigate(`/organization/${response.data._id}`);
      else alert("Invalid Credentials");
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else {
        alert("Login Failed");
      }
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Paper
            elevation={15}
            sx={{
              height: "80vh",
              width: 500,
              m: "100px auto",
              p: 5,
              backgroundColor: "#ffffff",
            }}
          >
            <Grid align="center">
              <Avatar sx={{ bgcolor: "#d62828", width: 70, height: 70 }}>
                {" "}
                <LockOutlinedIcon sx={{ width: 30, height: 30 }} />
              </Avatar>
              <Typography variant="h4" sx={{ paddingTop: 2, marginBottom: 2 }}>
                Login
              </Typography>
            </Grid>

            <Grid container rowSpacing={3} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Organization Mail-ID"
                  placeholder="Organization Mail-ID"
                  type="Organization Mail-ID"
                  fullWidth
                  required
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  placeholder="Password"
                  type="password"
                  fullWidth
                  required
                  variant="standard"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                m: "20px 0",
                p: 1,
                backgroundColor: "#444444",
                color: "#ffffff",
                border: "none",
                borderRadius: 4,
                fontSize: "1.2rem",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#363636",
                },
              }}
            >
              SUBMIT
            </Button>
            <Grid container>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  sx={{ left: 0, bottom: 0, textAlign: "left" }}
                >
                  &lt;<Link to="/organization">Home</Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </Container>
  );
}

export default Org_Login;
