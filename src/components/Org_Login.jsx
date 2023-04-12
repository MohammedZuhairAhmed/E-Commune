import { useState } from "react";
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

function Org_Login() {
  const [orgname, setOrgname] = useState("");
  const [password, setPassword] = useState("");

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
                label="Organization Name"
                placeholder="Organization Name"
                type="Organization Name"
                fullWidth
                required
                variant="standard"
                onChange={(e) => setOrgname(e.target.value)}
                value={orgname}
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
                &lt;<Link to="/organization">Home</Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
}

export default Org_Login;
