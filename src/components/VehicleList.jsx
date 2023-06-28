import axios from "../api/axios";
import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import Modal from "react-modal";
import image from "../images/Img1.png";

const VehicleList = () => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const { id } = useParams();
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
    navigate(`/commuter/${id}`);
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

  const handleCarRegister = async (vehicleId, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) {
        arr[i] = 1; // Change the first occurrence of 0 to 1
        break; // Exit the loop after modifying the seat
      }
    }

    try {
      await axios.patch("/vehicle/auth/select", {
        cid: id,
        vid: vehicleId,
        seats: arr,
      });
      console.log("Vehicle added to commuter successfully");
      openPopup();
    } catch (error) {
      console.error("Error adding vehicle to commuter:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch commuter details to get orgID
        const commuterResponse = await axios.get(`/commuter/auth/id/${id}`);
        const { orgID, selected_vehicle_ids } = commuterResponse.data;
        setLat(commuterResponse.data.lat);
        setLng(commuterResponse.data.lng);

        // Fetch organization details by orgID
        const organizationResponse = await axios.get(
          `/organization/auth/id/${orgID}`
        );
        const organization = organizationResponse.data;

        // Extract the selected vehicle details
        const vehicles = organization.selected_vehicle_ids;

        let filteredVehicles;

        // Filter the vehicles based on the selected_vehicle_ids array
        if (selected_vehicle_ids.length === 0) {
          // If selected_vehicle_ids is empty, set selectedVehicles to the entire vehicles array
          filteredVehicles = vehicles;
        } else {
          // Remove the vehicles with matching _id from the vehicles array
          filteredVehicles = vehicles.filter((vehicle) => {
            // Check if the vehicle _id is not present in the selected_vehicle_ids array
            return !selected_vehicle_ids.some(
              (selectedId) => selectedId._id === vehicle._id
            );
          });
        }

        // Remove vehicles with available_seats = 0 from filteredVehicles
        filteredVehicles = filteredVehicles.filter(
          (vehicle) => vehicle.available_seats > 0
        );

        // Store the filtered vehicle details in state variable
        setSelectedVehicles(filteredVehicles);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Paper elevation={3} style={{ width: "95%", padding: "16px" }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f8f8f8" }}>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Type</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">From</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">To</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Number</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Arrival Time</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Departure Time</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Available Seats</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Map View</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedVehicles.map((vehicle, index) => (
              <TableRow
                key={index}
                style={{ backgroundColor: index % 2 ? "#f8f8f8" : "white" }}
              >
                <TableCell>
                  <Typography>{vehicle.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{vehicle.type}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{vehicle.from}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{vehicle.to}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{vehicle.number}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{vehicle.arrivalTime}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{vehicle.departureTime}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{vehicle.available_seats}</Typography>
                </TableCell>
                <TableCell>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Link to={`/vehicle/${vehicle._id}?lat=${lat}&lng=${lng}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ fontWeight: "bold" }}
                      >
                        Map View
                      </Button>
                    </Link>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {vehicle.type === "Car" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleCarRegister(vehicle._id, vehicle.seats)
                        }
                        style={{ fontWeight: "bold" }}
                      >
                        Register
                      </Button>
                    ) : (
                      <Link to={`/seats/${id}/${vehicle._id}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ fontWeight: "bold" }}
                        >
                          Seat Selection
                        </Button>
                      </Link>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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

export default VehicleList;
