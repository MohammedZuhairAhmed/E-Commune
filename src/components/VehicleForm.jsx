import { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DirectionsTransitFilledTwoToneIcon from "@mui/icons-material/DirectionsTransitFilledTwoTone";
import axios from "../api/axios";
import MapForm from "./MapForm";

const VehicleForm = () => {
  const [name, setName] = useState(null);
  const [type, setType] = useState("");
  const [seats, setSeats] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [fromLocation, setFromLocation] = useState({ lat: null, lng: null });
  const [toLocation, setToLocation] = useState({ lat: null, lng: null });
  // arival and destination time will be added later

  const handleAddressChange = (
    from,
    to,
    fromLat,
    fromLng,
    toLat,
    toLng,
    reset = false
  ) => {
    setFrom(from);
    setTo(to);
    setFromLocation({ lat: fromLat, lng: fromLng });
    setToLocation({ lat: toLat, lng: toLng });

    if (reset) {
      setFrom("");
      setTo("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    if (name && type && seats && from && to && fromLocation && toLocation) {
      // console.log(name, type, seats, from, to, fromLocation, toLocation);
    }

    // try {
    //   const response = await axios.get(
    //     "/organization/mapform",

    //     JSON.stringify({ username, password }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(JSON.stringify(response.data));
    //   setData(response.data);
    //   setUsername("");
    //   setPassword("");
    //   setData(response.data);
    //   setIsAuthenticated(true);
    // } catch (err) {
    //   if (!err?.response) {
    //     alert("No Server Response");
    //   } else {
    //     alert("Login Failed");
    //   }
    // }
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Paper
              elevation={15}
              sx={{
                width: 500,
                m: "100px auto",
                p: 5,
                backgroundColor: "#DAF5FF",
              }}
            >
              <Grid align="center">
                <Avatar sx={{ bgcolor: "#00e1ff", width: 70, height: 70 }}>
                  <DirectionsTransitFilledTwoToneIcon
                    sx={{ width: 70, height: 70 }}
                  />
                </Avatar>
                <Typography
                  variant="h4"
                  sx={{ paddingTop: 2, marginBottom: 2 }}
                >
                  Commute Details
                </Typography>
              </Grid>

              <Grid container rowSpacing={3} spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Commute Name"
                    placeholder="Commute Name"
                    fullWidth
                    required
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
                  <Select
                    labelId="vehicle-type-label"
                    id="vehicle-type-select"
                    value={type}
                    fullWidth
                    required
                    variant="standard"
                    displayEmpty
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value="" disabled>
                      Select Vehicle Type
                    </MenuItem>
                    <MenuItem value={"Bicycle"}>Bicycle</MenuItem>
                    <MenuItem value={"Bike"}>Bike</MenuItem>
                    <MenuItem value={"Car"}>Car</MenuItem>
                    <MenuItem value={"Bus"}>Bus</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Number of Seats"
                    placeholder="Number of Seats"
                    fullWidth
                    type="number"
                    required
                    variant="standard"
                    onChange={(e) => setSeats(e.target.value)}
                    value={seats}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel htmlFor="from-address">From Address</InputLabel>
                  <TextField
                    id="from-address"
                    fullWidth
                    required
                    variant="standard"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel htmlFor="to-address">To Address</InputLabel>
                  <TextField
                    id="to-address"
                    fullWidth
                    required
                    variant="standard"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ m: "20px 0", p: 1 }}
                disabled={
                  !name ||
                  !type ||
                  !seats ||
                  !from ||
                  !to ||
                  !fromLocation ||
                  !toLocation ||
                  !fromLocation.lat ||
                  !fromLocation.lng ||
                  !toLocation.lat ||
                  !toLocation.lng
                }
              >
                SUBMIT
              </Button>
            </Paper>
          </Grid>
        </form>
      </div>
      <MapForm
        onAddressChange={handleAddressChange}
        style={{ flex: "1", height: "100vh", width: "50%", float: "right" }}
      />
    </div>
  );
};

export default VehicleForm;
