import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://lh3.googleusercontent.com/35t3dhIiwRtuhuNlqD6xYZq7Xw43MjXsTL84_hyK8EeusiawrzUB7jZmXCIV72pi-fk0GIKphjAZsqjWLWtLqv3fD7nBxXysJhTYgQwpICUNqSff-DdaQwuPPtyeUPyK_dZlVyMt-w0o5LOCVbxJZx_QCP-iysG-RmlYflkQlVLGCPEQXGtHXE78ryCHGLghGgknzxjloyFPtG2NQbCOS5OqiUni7Tqad43TP9JFXk_I6Z9Tfz4rLpALmQ93xW7vqzEUiEmGst5lPpSnz62RQsRttin5HxSokbpziHgX-GLGNS_5GtkZxIXdnu9ac4R6Qy6HzVUw2_CHAnwdlrph9D1D-JCj-qyk-_CaVKEQ3tYBpfIj5_O8T1E84CEDlKUdh4ELTsEb8fxZPaYYSaFWBlwudFhzRU4Iv44LBqPgENrSZZgt6xUL-SzHcFbDcifEuVFq4LnKhA_B5n0Qhcvg5EGLWvFKfsH0C1lLPZV6TJ1IhNxJ5Pv5hTTBz2A8dXVXZ1oHX5rywOGiFHlhq8gHyoQg60Xk_8u4u9_D2AzMewoMo1EXg192NSDkgCAQ8XWqp5thGSoEEM9kIn-8uLlFyfATlgQ-wMD2FUh8F6wmgv7msuwgSR8UeKVecEocgTP07mDwu4dPsQsBoeKdC2X1Z7rjgq4pDN3TCNi8X0iNH_c9coaw9HbYmFb866KodhIDP99BN4HlBngKHzEd-IO-jKRcBVedJnnN541WZEsQv_8tibzqr3Kztntlvy9XM7zRJ5yj4C47DPMwkNivWaYNXXdLfdnrOTrsKeZf2_7NSbuEUi9GK50kfvS0d_9pDdVijRWPA7PanDWaj_kn7cZql6O9Zt1oYTmilmwgqOvuR72I7z2UFmqI3xIbK1k6Y8wHFR0cyt7hkZUj5V7kZGguXsjg6oWrnH1lMf8j2PxwjpOlyQ44r--IPA3M4OVXDLyIKkeXf_KEOvqxsr45xK5EAsAnicfk8M4VbkEIwZRh3ANm51CN1AB4ug=w720-h404-s-no?authuser=0");
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
