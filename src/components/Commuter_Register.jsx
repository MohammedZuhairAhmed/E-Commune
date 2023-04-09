import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Commuter_Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  useEffect(() => {
    if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMsg("Password must be at least 8 characters long");
    } else if (password !== conPassword) {
      setPasswordError(true);
      setPasswordErrorMsg("Passwords do not match");
    } else {
      setPasswordError(false);
      setPasswordErrorMsg("");
    }
  }, [password]);

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submission behavior
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Paper
          elevation={15}
          sx={{ height: "80vh", width: 500, m: "100px auto", p: 5 }}
        >
          <Grid align="center">
            <Avatar sx={{ bgcolor: "#00e1ff", width: 70, height: 70 }}>
              <LockOutlinedIcon sx={{ width: 30, height: 30 }} />
            </Avatar>
            <Typography variant="h4" sx={{ paddingTop: 2, marginBottom: 2 }}>
              Register
            </Typography>
          </Grid>

          <Grid container rowSpacing={3} spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                placeholder="First Name"
                fullWidth
                required
                variant="standard"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Last Name"
                placeholder="Last Name"
                fullWidth
                variant="standard"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Mobile Number"
                placeholder="Mobile Number"
                fullWidth
                required
                variant="standard"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="E-Mail"
                placeholder="E-Mail"
                type="email"
                fullWidth
                required
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={passwordError}
                helperText={passwordErrorMsg}
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

            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                fullWidth
                required
                variant="standard"
                onChange={(e) => setConPassword(e.target.value)}
                value={conPassword}
              />
            </Grid>
          </Grid>

          <Button variant="contained" fullWidth sx={{ m: "20px 0", p: 1 }}>
            SUBMIT
          </Button>
          <Grid container>
            <Grid item xs={4}>
              <Typography
                variant="body1"
                sx={{ left: 0, bottom: 0, textAlign: "left" }}
              >
                &lt; <Link href="https://google.com/">Home</Link>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                sx={{ right: 0, bottom: 0, textAlign: "right" }}
              >
                Already have an account ?{" "}
                <Link href="https://google.com/">Sign in</Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
}

export default Commuter_Register;
