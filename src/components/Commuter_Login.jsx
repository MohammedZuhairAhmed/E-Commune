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
const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://lh3.googleusercontent.com/FElZqDfXS54pvRWCaXIuKCl_0Z2SkrTX8_L1Sme9bR3qCvnuVXHDtBLyKV-MXxoCcpsg7FQekwQnk6szxhgdSzVlTTK9W0zqHwgUciWmmZl6RuRppa5nrPe6ffSprS3A3My2jdFL2v-lj1UFQrTzlq63hl74Tm-oCdeuAOOQ-A5QL2yhwt6sXkU9UVS5-ILMIffpDQeFkQ00UUBynqg_QJFEfc_Od19EnffEKHF-3wocUV197cxBg8LqS0G2o012iS8F5ItbVNC-fk0RmI3QBUbcmS2HVcV9mm4WuS5GnfyTVMD27ybCklJbRCmPn45LDLDveRm-vxDgCMnN3FlYYrMHeT2SMI-agF0ZkkMX7jBY3QmJc-5avrqjonH55eeY-Zuq_ZAaanRp_strY80gKNPtnFLE94mw-oAbMnJ4FgianE2fOSfN1MtZN3J-tLN-cgR6Y4LbARhOvB8hbjkezzuYzdC3AYmg15vBHkW3git4IIrYr_SNz2f2POS34VV0C0tKZRW87hqWeoxdDQSoFFf_078tfrRda7eYYutjg0e1Yhvsaie8i556LNU7IVSK3sauNEYQsz6RXUVfHk5qK6UBdRMRoZZLerWpoh2YepvJ8J434zulNrYxYVKg0f9zD6Mk-88De61spX2eYGjHkSL1jcval5ZA6qZCItt3k7HeW_8Jfz40mUddEfkfvMCh-VtTcmRG3eNETdC05KN7mFzFM12qwP1OQM6B5D8kzltNFvIRDpuHkkpgU6GZTEO2SnxyXpCJyUOydz0rcZ2B2zFCMNuQMiMZvIcUhwvX-BANf3fcnArf8JJUIgd5MnLmYoP-yBSb08Q_rnr3ycSZZM_rqFz-HIlXKktezhfk8pucoYN11Y7ckpVlyeH1sM3frLJrZaq6Erv6HaqMERxP0XMsIP-DVTbpWO24oH3uJYTq3hPHZTAXcMHph3PUhtbNZuN9x-xJ50mLDvwSln0j-NDYDD-AX3IxXGRHqifd2N0mD2f3WRZ3iw=w720-h360-s-no?authuser=0");
  background-size: cover;
  background-color: #f2f2f2;
`;
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
                  &lt;<Link to="/commuter">Home</Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </Container>
  );
}

export default Commuter_Login;
