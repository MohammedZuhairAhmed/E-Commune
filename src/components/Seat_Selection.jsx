import { useState, useEffect } from "react";
import { Grid, Box, Paper, Typography, Button } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Modal from "react-modal";

const SeatSelection = () => {
  const { cid, vid } = useParams();
  const [numSeats, setNumSeats] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [alreadySelected, setAlreadySelected] = useState([]);
  const seatsPerRow = 5;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const PopupContent = ({ onClose }) => {
    return (
      <div>
        <Typography
          variant="body1"
          sx={{ right: 0, bottom: 0, textAlign: "middle" }}
        >
          You have successfully registered for this commute program.
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" onClick={onClose}>
            close
          </Button>
        </div>
      </div>
    );
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    navigate(`/commuter/${cid}`);
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

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/vehicle");
        const vehicles = response.data;
        const foundVehicle = vehicles.find((vehicle) => vehicle._id === vid);
        setNumSeats(foundVehicle.no_of_seats);
        setAlreadySelected(foundVehicle.seats);

        console.log(foundVehicle);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    alreadySelected[selectedSeat - 1] = 1;
    console.log(alreadySelected);
    try {
      await axios.patch("/vehicle/auth/select", {
        cid,
        vid,
        seats: alreadySelected,
      });
      console.log("Vehicle added to commuter successfully");
      openPopup();
    } catch (error) {
      console.error("Error adding vehicle to commuter:", error);
    }
  };

  const handleSeatClick = (seatNumber) => {
    setSelectedSeat((prevSelectedSeat) => {
      // Deselect the previously selected seat if any
      if (alreadySelected[seatNumber - 1] === 1) return prevSelectedSeat;
      if (prevSelectedSeat === seatNumber) {
        return null;
      }
      // Select the newly clicked seat
      return seatNumber;
    });
  };

  const renderSeats = () => {
    const seats = [];
    const numRows = Math.ceil(numSeats / seatsPerRow);

    for (let i = 0; i < numRows; i++) {
      const rowSeats = [];

      for (let j = 0; j < seatsPerRow; j++) {
        const seatNumber = i * seatsPerRow + j + 1;
        if (seatNumber > numSeats) {
          break;
        }

        const isSeatSelected = selectedSeat === seatNumber;
        const isAlreadySelected = alreadySelected[seatNumber - 1] === 1;

        rowSeats.push(
          <Grid item key={seatNumber}>
            <EventSeatIcon
              onClick={() => handleSeatClick(seatNumber)}
              style={{
                fontSize: "48px",
                color: isAlreadySelected
                  ? "red"
                  : isSeatSelected
                  ? "blue"
                  : "black",
              }}
            />
          </Grid>
        );
      }

      seats.push(
        <Grid
          container
          spacing={0}
          justifyContent="center"
          alignItems="center"
          key={i}
        >
          {rowSeats}
        </Grid>
      );
    }

    return seats;
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Grid container rowSpacing={3} justifyContent="center">
          <Grid>{renderSeats()}</Grid>
          {selectedSeat != null && (
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
                style={{ fontWeight: "bold" }}
              >
                Register
              </Button>
            </Grid>
          )}
        </Grid>
        <Paper
          elevation={3}
          style={{
            position: "absolute",
            top: "56%",
            right: "15%",
            transform: "translateY(-50%)",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <EventSeatIcon style={{ fontSize: "48px", color: "black" }} />
            <Typography variant="h6">Unselected Seats</Typography>
          </div>
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <EventSeatIcon style={{ fontSize: "48px", color: "red" }} />
            <Typography variant="h6">Already Selected Seats</Typography>
          </div>
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <EventSeatIcon style={{ fontSize: "48px", color: "blue" }} />
            <Typography variant="h6">Currently Selected Seats</Typography>
          </div>
        </Paper>
      </Box>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        contentLabel="Popup"
        style={customModalStyles}
      >
        <PopupContent onClose={closePopup} />
      </Modal>
    </div>
  );
};

export default SeatSelection;
