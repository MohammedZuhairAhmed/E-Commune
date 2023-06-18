import { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  InputLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../api/axios";
import Modal from "react-modal";
import SelectButton from "./SelectButton";
import Reg_mapform from "./Reg_mapform";

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
  const [source, setSource] = useState(null);
  const [location, setLocation] = useState(null);
  const [checked, setChecked] = useState(false);
  const [orgID, setOrgID] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const login_link = "/commuter/auth/login";

  const PopupContent = ({ onClose }) => {
    
    return (
      <div>
        <p></p>
        <Typography
                    variant="body1"
                    sx={{ right: 0, bottom: 0, textAlign: "middle" }}
                  >
                    Registration is successful. Please continue to the login page.
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button variant="contained" onClick={onClose}>Log In</Button>
      </div>
      </div>
    );
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    navigate(`${login_link}`);
  };

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "300px",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const handleAddressChange = (source, lat, lng, reset = false) => {
    setSource(source);
    setLocation({ lat: lat, lng: lng });

    if (reset) {
      setSource("");
    }
  };

  const handleOrgIDChange = (orgID) => {
    setOrgID(orgID);
  };

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
    console.log(orgID);
    try {
      const response = await axios.post(
        "/commuter/auth/register",

        JSON.stringify({
          fname,
          lname,
          username,
          email,
          number,
          password,
          opted_for_program: checked,
          lat: location.lat,
          lng: location.lng,
          orgID,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response.data));
      openPopup();
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else if (err.response?.status === 409) {
        alert("Username Taken");
      } else {
        alert("Registration Failed");
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Paper
              elevation={15}
              sx={{
                height: "105vh",
                width: 500,
                m: "auto",
                mt: "100px",
                p: 5,
                backgroundColor: "#ffffff",
              }}
            >
              <Grid align="center">
                <Avatar sx={{ bgcolor: "#d62828", width: 70, height: 70 }}>
                  <LockOutlinedIcon sx={{ width: 30, height: 30 }} />
                </Avatar>
                <Typography
                  variant="h4"
                  sx={{ paddingTop: 2, marginBottom: 2 }}
                >
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
                  <SelectButton onOrgIDChange={handleOrgIDChange} />
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

              <Grid item xs={12}>
                <InputLabel htmlFor="Address">Address</InputLabel>
                <TextField
                  id="address"
                  fullWidth
                  required
                  variant="standard"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel htmlFor="opt-in">
                  Do you want to opt-in for commute program?
                </InputLabel>
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
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
                <Grid item xs={8}>
                  <Typography
                    variant="body1"
                    sx={{ right: 0, bottom: 0, textAlign: "right" }}
                  >
                    Already have an account ?
                    <Link to="/commuter/auth/login">Sign in</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </form>
        <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Popup"
        style={customModalStyles}
      >
        <PopupContent onClose={closePopup} />
      </Modal>
      </div>
      <Reg_mapform
        onAddressChange={handleAddressChange}
        style={{ flex: "1", height: "125vh", width: "50%", float: "right" }}
      />
    </div>
  );
}

export default Commuter_Register;
