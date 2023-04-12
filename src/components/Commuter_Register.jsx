import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

function Commuter_Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setusername] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [conPasswordError, setConPasswordError] = useState(false);
  const [conPasswordErrorMsg, setConPasswordErrorMsg] = useState("");

  useEffect(() => {
    if (password.length === 0) {
      setPasswordError(null);
      setPasswordErrorMsg(null);
      return;
    }

    let hasError = false;
    let errorMsg = "";

    if (password.length < 8) {
      hasError = true;
      errorMsg = "Password must be at least 8 characters long";
    }

    if (!/\d/.test(password)) {
      hasError = true;
      errorMsg = "Password must contain at least one number";
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      hasError = true;
      errorMsg = "Password must contain at least one special character";
    }

    if (!/[a-z]/.test(password)) {
      hasError = true;
      errorMsg = "Password must contain at least one lowercase letter";
    }

    if (!/[A-Z]/.test(password)) {
      hasError = true;
      errorMsg = "Password must contain at least one uppercase letter";
    }

    setPasswordError(hasError);
    setPasswordErrorMsg(errorMsg);

    let conHasError = false;
    let conErrorMsg = "";

    if (conPassword.length > 0 && password !== conPassword) {
      conHasError = true;
      conErrorMsg = "Passwords do not match";
    }

    setConPasswordError(conHasError);
    setConPasswordErrorMsg(conHasError ? conErrorMsg : null);
  }, [password, conPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    try{

      const response = await axios.post('/commuter/auth/register',

      JSON.stringify({fname,lname,username,email,number,password}),
      {
        headers: {'Content-Type': 'application/json'},
        withCredentials : true
      }
      );

      console.log(JSON.stringify(response));
    }catch(err){
      if (!err?.response) {
        alert('No Server Response');
    } else if (err.response?.status === 409) {
        alert('Username Taken');
    } else {
        alert('Registration Failed')
    }
    }
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
                onChange={(e) => setFname(e.target.value)}
                value={fname}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Last Name"
                placeholder="Last Name"
                fullWidth
                variant="standard"
                onChange={(e) => setLname(e.target.value)}
                value={lname}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Username"
                placeholder="Username"
                fullWidth
                required
                variant="standard"
                onChange={(e) => setusername(e.target.value)}
                value={username}
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
                error={conPasswordError}
                helperText={conPasswordErrorMsg}
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
            <Grid item xs={8}>
              <Typography
                variant="body1"
                sx={{ right: 0, bottom: 0, textAlign: "right" }}
              >
                Already have an account ?
                <Link to="/commuter/login">Sign in</Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
}

export default Commuter_Register;

// firstName lastName username email password
