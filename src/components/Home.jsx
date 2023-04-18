import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fwebsite%2520background%2F&psig=AOvVaw1e5ApS03R5pAevaZRiuH8I&ust=1681835846447000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-xfOssf4CFQAAAAAdAAAAABAE");
  background-size: cover;
  background-color: #f2f2f2;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #d62828;
  text-shadow: 2px 2px #444444;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #666666;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #666666;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const OrganizationButton = styled(Link)`
  padding: 1rem 2rem;
  background-color: #d62828;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  text-decoration: none;
  cursor: pointer;
`;

const CommuterButton = styled(Link)`
  padding: 1rem 2rem;
  background-color: #444444;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  text-decoration: none;
  cursor: pointer;
`;

function Home() {
  return (
    <Container>
      <Title>Welcome to the Home page</Title>
      <Subtitle>About Us</Subtitle>
      <Description>
        Our sustainable commute program aims to reduce the carbon footprint of
        our community by encouraging alternative modes of transportation.
      </Description>
      <Subtitle>Get Involved</Subtitle>
      <Description>
        Register your organization to host a commute or sign up as a commuter to
        find sustainable transportation options in your area.
      </Description>
      <ButtonWrapper>
        <OrganizationButton to="/organization">Organization</OrganizationButton>
        <CommuterButton to="/commuter">Commuter</CommuterButton>
      </ButtonWrapper>
    </Container>
  );
}

export default Home;
