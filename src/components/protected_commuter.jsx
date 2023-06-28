import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
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
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import image from "../images/Img1.png";

const Container = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundColor: "#f2f2f2",
  padding: theme.spacing(4),
  backgroundAttachment: "fixed",
}));

const CustomButton = styled(Button)`
  padding: 1rem 2rem;
  background-color: #d62828;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #990000;
  }
`;

function ProtectedCommuter() {
  const { id } = useParams();
  const [commuterData, setCommuterData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/commuter/auth/id/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setCommuterData(response.data);
        setSelectedVehicles(response.data.selected_vehicle_ids);
        setLat(response.data.lat);
        setLng(response.data.lng);
        if (response.data._id) setIsAuthenticated(true);
        else alert("Not authenticated");
      } catch (err) {
        if (!err?.response) alert("No server Response");
        else alert("Not authenticated");
      }
    };
    fetch();
  }, [id]);

  return (
    <>
      {!isAuthenticated ? (
        <Container>
          <h1>Loading</h1>
        </Container>
      ) : (
        <Container elevation={3}>
          <Box
            sx={{
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Typography variant="h2">
                Welcome {commuterData?.fname + " " + commuterData?.lname}!
              </Typography>
            </Grid>
            <div
              style={{ flexGrow: 1, width: "100%", justifyContent: "center" }}
            >
              <Paper elevation={3} style={{ width: "100%", padding: "16px" }}>
                <Typography variant="h4" style={{ marginBottom: "16px" }}>
                  Your Registered Commute Programs:
                </Typography>
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
                        style={{
                          backgroundColor: index % 2 ? "#f8f8f8" : "white",
                        }}
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
                            <Link
                              to={`/vehicle/${vehicle._id}?lat=${lat}&lng=${lng}`}
                            >
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
              <Grid item xs={12} sx={{ mt: 4, justifyContent: "center" }}>
                <Link to={"/commuter/" + commuterData?._id + "/vehicleList"}>
                  <CustomButton>Register for a Commute</CustomButton>
                </Link>
              </Grid>
            </div>
          </Box>
        </Container>
      )}
    </>
  );
}

export default ProtectedCommuter;
