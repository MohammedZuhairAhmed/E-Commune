import styled from "styled-components";

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

function Protected_Org({ data }) {
  return (
    <Container>
      <Title>Welcome to the Protected Organization page</Title>
      <DataList>
        <DataListItem>ID: {data._id}</DataListItem>
        <DataListItem>Name: {data.name}</DataListItem>
        <DataListItem>Email: {data.email}</DataListItem>
        {/* ...other properties */}
      </DataList>
    </Container>
  );
}

export default Protected_Org;
