import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://e0.pxfuel.com/wallpapers/779/896/desktop-wallpaper-transportation-background.jpg");
  background-size: cover;
  background-color: #f2f2f2;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #d62828;
  text-shadow: 2px 2px #444444;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #000;
  font-weight: #000;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #000;
  align-items: center;
  font-weight: bold;
  text-align: center;
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
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #b91c31;
  }
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
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #363636;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6rem;
`;

const InfoBox = styled.div`
  border-radius: 3px;
  padding: 3rem;
  max-width: 80rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const InfoTitle = styled.h3`
  font-size: 2rem;
  margin: 0em;
  text-align: center;
`;

const InfoParagraph = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: #000;
  font-weight: bold;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 40rem;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  margin: 3rem 0;

  @media (max-width: 768px) {
    max-height: 20rem;
  }
`;

function Home() {
  return (
    <Container>
      <Title>Welcome to the Home page</Title>
      <Subtitle>Sustainable Commute</Subtitle>
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
      <InfoWrapper>
        <InfoBox>
          <InfoTitle>How It Works</InfoTitle>
          <InfoParagraph>
            Organisations and Employees can connect through our platform to
            share a ride to work or other destinations. We match commuters and
            commute prgrams based on their location and commuting needs.
          </InfoParagraph>
          <ImageWrapper></ImageWrapper>
        </InfoBox>
      </InfoWrapper>
    </Container>
  );
}

export default Home;
