import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function Commuter_Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    try {
      const response = await axios.post(
        "/commuter/auth/login",

        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setUsername("");
      setPassword("");

      if (response.data._id) navigate(`/commuter/${response.data._id}`);
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
    <form onSubmit={handleSubmit}>
      <Grid>
        <Paper
          elevation={15}
          sx={{
            height: "80vh",
            width: 500,
            m: "100px auto",
            p: 5,
            backgroundColor: "#DAF5FF",
          }}
        >
          <Grid align="center">
            <Avatar sx={{ bgcolor: "#00e1ff", width: 70, height: 70 }}>
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
                label="Username"
                placeholder="Username"
                type="username"
                fullWidth
                required
                variant="standard"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
            sx={{ m: "20px 0", p: 1 }}
          >
            SUBMIT
          </Button>
          <Grid container>
            <Grid item xs={4}>
              <Typography
                variant="body1"
                sx={{ left: 0, bottom: 0, textAlign: "left" }}
              >
                &lt;<Link to="/commuter">Home</Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
}

export default Commuter_Login;
