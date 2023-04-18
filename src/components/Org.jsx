import { Link } from "react-router-dom";
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
`;

function Org() {
  return (
    <Container>
      <Title>Welcome to the Organization page</Title>
      <ButtonWrapper>
        <RegisterButton to="/organization/auth/register">
          REGISTER
        </RegisterButton>
        <LoginButton to="/organization/auth/login">LOGIN</LoginButton>
      </ButtonWrapper>
    </Container>
  );
}

export default Org;
