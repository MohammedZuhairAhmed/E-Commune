import { useState, useEffect } from "react";
import { Grid, Box, Paper, Typography } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const SeatSelection = () => {
  const { cid, vid } = useParams();
  const [numSeats, setNumSeats] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [alreadySelected, setAlreadySelected] = useState([]);
  const seatsPerRow = 5;

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

  const handleSeatClick = (seatNumber) => {
    setSelectedSeat((prevSelectedSeat) => {
      // Deselect the previously selected seat if any
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid container spacing={0} justifyContent="center">
        {renderSeats()}
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
  );
};

export default SeatSelection;

// useEffect(() => {
//   async function updateData() {
//     try {
//       await axios.patch("/vehicle/auth/select", {
//         cid,
//         vid,
//       });
//       console.log("Vehicle added to commuter successfully");
//     } catch (error) {
//       console.error("Error adding vehicle to commuter:", error);
//     }
//   }
//   updateData();
// }, []);
