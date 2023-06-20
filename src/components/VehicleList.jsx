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
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const VehicleList = () => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch commuter details to get orgID
        const commuterResponse = await axios.get(`/commuter/auth/id/${id}`);
        const { orgID } = commuterResponse.data;
        setLat(commuterResponse.data.lat);
        setLng(commuterResponse.data.lng);
        // Fetch organization details by orgID
        const organizationResponse = await axios.get(
          `/organization/auth/id/${orgID}`
        );
        const organization = organizationResponse.data;

        // Extract the selected vehicle details
        const vehicles = organization.selected_vehicle_ids;

        // Store the selected vehicle details in state variable
        setSelectedVehicles(vehicles);
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
                <Typography variant="h6">No. of Seats</Typography>
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
                  <Typography>{vehicle.seats}</Typography>
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
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ fontWeight: "bold" }}
                    >
                      Select
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default VehicleList;
