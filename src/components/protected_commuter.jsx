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

const Container = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundImage:
    'url("https://lh3.googleusercontent.com/35t3dhIiwRtuhuNlqD6xYZq7Xw43MjXsTL84_hyK8EeusiawrzUB7jZmXCIV72pi-fk0GIKphjAZsqjWLWtLqv3fD7nBxXysJhTYgQwpICUNqSff-DdaQwuPPtyeUPyK_dZlVyMt-w0o5LOCVbxJZx_QCP-iysG-RmlYflkQlVLGCPEQXGtHXE78ryCHGLghGgknzxjloyFPtG2NQbCOS5OqiUni7Tqad43TP9JFXk_I6Z9Tfz4rLpALmQ93xW7vqzEUiEmGst5lPpSnz62RQsRttin5HxSokbpziHgX-GLGNS_5GtkZxIXdnu9ac4R6Qy6HzVUw2_CHAnwdlrph9D1D-JCj-qyk-_CaVKEQ3tYBpfIj5_O8T1E84CEDlKUdh4ELTsEb8fxZPaYYSaFWBlwudFhzRU4Iv44LBqPgENrSZZgt6xUL-SzHcFbDcifEuVFq4LnKhA_B5n0Qhcvg5EGLWvFKfsH0C1lLPZV6TJ1IhNxJ5Pv5hTTBz2A8dXVXZ1oHX5rywOGiFHlhq8gHyoQg60Xk_8u4u9_D2AzMewoMo1EXg192NSDkgCAQ8XWqp5thGSoEEM9kIn-8uLlFyfATlgQ-wMD2FUh8F6wmgv7msuwgSR8UeKVecEocgTP07mDwu4dPsQsBoeKdC2X1Z7rjgq4pDN3TCNi8X0iNH_c9coaw9HbYmFb866KodhIDP99BN4HlBngKHzEd-IO-jKRcBVedJnnN541WZEsQv_8tibzqr3Kztntlvy9XM7zRJ5yj4C47DPMwkNivWaYNXXdLfdnrOTrsKeZf2_7NSbuEUi9GK50kfvS0d_9pDdVijRWPA7PanDWaj_kn7cZql6O9Zt1oYTmilmwgqOvuR72I7z2UFmqI3xIbK1k6Y8wHFR0cyt7hkZUj5V7kZGguXsjg6oWrnH1lMf8j2PxwjpOlyQ44r--IPA3M4OVXDLyIKkeXf_KEOvqxsr45xK5EAsAnicfk8M4VbkEIwZRh3ANm51CN1AB4ug=w720-h404-s-no?authuser=0")',
  backgroundSize: "cover",
  backgroundColor: "#f2f2f2",
  padding: theme.spacing(4),
}));

// const Title = styled(Typography)(({ theme }) => ({
//   fontSize: "2.5rem",
//   marginBottom: theme.spacing(4),
//   color: "#444444",
// }));
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

// const Subtitle = styled(Typography)(({ theme }) => ({
//   marginTop: theme.spacing(4),
//   marginBottom: theme.spacing(2),
//   color: "#444444",
// }));

// const DataList = styled(Grid)(({ theme }) => ({
//   marginTop: theme.spacing(4),
// }));

const DataListItem = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  marginBottom: theme.spacing(2),
  color: "#444444",
}));

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
        <h1>Loading</h1>
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
