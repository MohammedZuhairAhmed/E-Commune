import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import { Button, Typography, Grid, Paper, Box } from "@mui/material";
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

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  marginBottom: theme.spacing(4),
  color: "#444444",
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

const Subtitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  color: "#444444",
}));

const DataList = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const DataListItem = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  marginBottom: theme.spacing(2),
  color: "#444444",
}));

function Protected_Org() {
  const { id } = useParams();
  const [orgData, setOrgData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/organization/auth/id/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setOrgData(response.data);
        console.log(response.data);
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
          <Box sx={{ maxWidth: "800px", width: "100%" }}>
            <Title
              sx={{ fontFamily: "Arial", fontSize: "2.5rem", color: "#444444" }}
              variant="h1"
            >
              <h1> WELCOME {orgData?.name}</h1>
            </Title>

            <Title
              sx={{ fontFamily: "Arial", fontSize: "2.5rem", color: "#444444" }}
              variant="h1"
            >
              PROTECTED ORGANISATION PAGE
            </Title>

            <DataList container>
              <Grid item xs={12}>
                <Subtitle variant="h2">Organization Info:</Subtitle>
              </Grid>
              <Grid item xs={12}>
                <DataListItem variant="h3">ID: {orgData?._id}</DataListItem>
              </Grid>
              <Grid item xs={12}>
                <DataListItem variant="h3">Name: {orgData?.name}</DataListItem>
              </Grid>
              <Grid item xs={12}>
                <DataListItem variant="h3">
                  Email: {orgData?.email}
                </DataListItem>
              </Grid>
              <Grid item xs={12}>
                <Link to={"/organization/" + orgData?._id + "/vehicleForm"}>
                  <CustomButton>Add commute details</CustomButton>
                </Link>
              </Grid>
            </DataList>
          </Box>
        </Container>
      )}
    </>
  );
}

export default Protected_Org;
