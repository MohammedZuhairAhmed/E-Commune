import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import { Button, Typography, Grid, Paper, Box } from "@mui/material";
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
        <h1>Not authenticated</h1>
      ) : (
        <Container elevation={3}>
          <Box sx={{ maxWidth: "800px", width: "100%" }}>
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
