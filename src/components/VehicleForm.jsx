import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import Modal from "react-modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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
  const [arrival, setArrival] = useState(null);
  const [depart, setDepart] = useState(null);
  const arrivalTimeRef = useRef(null);
  const departTimeRef = useRef(null);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(null);
  const [val, setVal] = useState(null);
  const navigate = useNavigate();

  const PopupContent = ({ onClose }) => {
    const handleYesClick = () => {
      setVal(true);
      onClose();
    };

    const handleNoClick = () => {
      setVal(false);
      onClose();
    };

    return (
      <div>
        <Typography
          variant="body1"
          sx={{ right: 0, bottom: 0, textAlign: "middle" }}
        >
          Do you want to use your address as your destination address
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleYesClick}
            style={{ marginRight: "10px" }}
          >
            Yes
          </Button>
          <Button variant="contained" onClick={handleNoClick}>
            No
          </Button>
        </div>
      </div>
    );
  };

  const PopupContent1 = ({ onClose }) => {
    const handleYesClick = () => {
      onClose();
    };

    const handleNoClick = () => {
      navigate(`/organization/${id}`);
      onClose();
    };
    return (
      <div>
        <p></p>
        <Typography
          variant="body1"
          sx={{ right: 0, bottom: 0, textAlign: "middle" }}
        >
          Commute details registration is successful. Do you want to add another
          commute details?
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleYesClick}
            style={{ marginRight: "10px" }}
          >
            Yes
          </Button>
          <Button variant="contained" onClick={handleNoClick}>
            No
          </Button>
        </div>
      </div>
    );
  };

  const openPopup1 = () => {
    setIsOpen1(true);
  };

  const closePopup1 = () => {
    setIsOpen1(false);
  };

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

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    // Show pickup points popup when the component mounts
    openPopup();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    setArrival(
      new Date(
        arrivalTimeRef.current.querySelector("input").value
      ).toISOString()
    );
    setDepart(
      new Date(departTimeRef.current.querySelector("input").value).toISOString()
    );

    if (
      name &&
      type &&
      seats &&
      from &&
      to &&
      fromLocation &&
      toLocation &&
      number &&
      arrival &&
      depart
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
            arrivalTime: arrival,
            departureTime: depart,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response.data));
        openPopup1();
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
                backgroundColor: "#ffffff",
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

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Arrival Time"
                      fullWidth
                      required
                      defaultValue={arrival}
                      ref={arrivalTimeRef}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Departure Time"
                      fullWidth
                      required
                      value={depart}
                      ref={departTimeRef}
                    />
                  </LocalizationProvider>
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
        <Modal
          isOpen={isOpen}
          onRequestClose={closePopup}
          contentLabel="Popup"
          style={customModalStyles}
        >
          <PopupContent onClose={closePopup} />
        </Modal>
        <Modal
          isOpen={isOpen1}
          onRequestClose={closePopup1}
          contentLabel="Popup"
          style={customModalStyles}
        >
          <PopupContent1 onClose={closePopup1} />
        </Modal>
      </div>
      {val !== null && (
        <MapForm
          onAddressChange={handleAddressChange}
          style={{ flex: "1", height: "125vh", width: "50%", float: "right" }}
          val={val}
        />
      )}
    </div>
  );
}

export default VehicleForm;
