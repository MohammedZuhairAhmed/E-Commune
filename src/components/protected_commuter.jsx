import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Button } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #444444;
`;

const DataList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 2rem;
`;

const DataListItem = styled.li`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #444444;
`;

function Protected_commuter() {
  const { id } = useParams();
  const [commuterData, setCommuterData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/commuter/auth/id/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setCommuterData(response.data);
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
        <Container>
          <Title>Welcome to the Protected Commuter page</Title>
          <DataList>
            <DataListItem>ID: {commuterData._id}</DataListItem>
            <DataListItem>Name: {commuterData.fname}</DataListItem>
            <DataListItem>Email: {commuterData.email}</DataListItem>
            <Link to={"/commuter/" + commuterData._id + "/vehicleList"}>
              <Button>Register for a commute</Button>
            </Link>
          </DataList>
        </Container>
      )}
    </>
  );
}

export default Protected_commuter;
