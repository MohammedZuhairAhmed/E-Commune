import { Link } from "react-router-dom";
import styled from "styled-components";
import image from "../images/back2.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${image});
  background-size: cover;
  background-color: #f2f2f2;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #444444;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const RegisterButton = styled(Link)`
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
`;

const LoginButton = styled(Link)`
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

function Commuter() {
  return (
    <Container>
      <Title>Welcome to the Commuter page</Title>
      <ButtonWrapper>
        <RegisterButton to="/commuter/auth/register">REGISTER</RegisterButton>
        <LoginButton to="/commuter/auth/login">LOGIN</LoginButton>
      </ButtonWrapper>
    </Container>
  );
}

export default Commuter;
