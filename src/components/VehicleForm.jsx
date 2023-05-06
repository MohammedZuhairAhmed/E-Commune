import { useState } from "react";
import { useParams } from "react-router-dom";
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

function VehicleForm() {
  const [name, setName] = useState(null);
  const [type, setType] = useState("");
  const [seats, setSeats] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [fromLocation, setFromLocation] = useState({ lat: null, lng: null });
  const [toLocation, setToLocation] = useState({ lat: null, lng: null });
  const [number, setNumber] = useState(null);
  const { id } = useParams();
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

    if (
      name &&
      type &&
      seats &&
      from &&
      to &&
      fromLocation &&
      toLocation &&
      number
    ) {
      try {
        const response = await axios.post(
          "/vehicle",
          JSON.stringify({
            name,
            type,
            from,
            to,
            fromLat: fromLocation.lat,
            fromLong: fromLocation.lng,
            toLat: toLocation.lat,
            toLong: toLocation.lng,
            number,
            orgId: id,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response.data));
      } catch (err) {
        if (!err?.response) {
          alert("No Server Response");
        } else if (err.response?.status === 409) {
          alert("vehcile number Taken");
        } else {
          alert("vehicle registration Failed");
        }
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
                width: 500,
                m: "100px auto",
                p: 5,
                backgroundColor: "#DAF5FF",
              }}
            >
              <Grid align="center">
                <Avatar sx={{ bgcolor: "#d62828", width: 70, height: 70 }}>
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
                    label="Vehicle Number"
                    placeholder="Vehicle Number"
                    fullWidth
                    type="text"
                    required
                    variant="standard"
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                  />
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
                disabled={
                  !name ||
                  !type ||
                  !number ||
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
}

export default VehicleForm;
