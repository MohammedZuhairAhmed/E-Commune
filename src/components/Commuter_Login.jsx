import { useState } from "react";
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

function Commuter_Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const [passwordError, setPasswordError] = useState(false);
  //   const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  // useEffect(() => {
  //     if (password.length < 8) {
  //       setPasswordError(true);
  //       setPasswordErrorMsg("Password must be at least 8 characters long");
  //     } else if (password !== conPassword) {
  //       setPasswordError(true);
  //       setPasswordErrorMsg("Passwords do not match");
  //     } else {
  //       setPasswordError(false);
  //       setPasswordErrorMsg("");
  //     }
  //   }, [password]);

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
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
}

export default Commuter_Login;
