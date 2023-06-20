import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  background: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(211, 211, 211);
`;
const Wrapper = styled.div`
  width: 75vw;
  height: 75vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://i.scdn.co/image/ab6761610000e5eb32845b1556f9dbdfe8ee6575")
      center center no-repeat;

  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;
const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  text-align: center;
  font-size: 3rem;
  letter-spacing: 0.05em;
  margin: 1em 0;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 40%;
  padding: 1em;
  margin: 0.6em 0;
  border: none;
  border-radius: 5px;
  background: rgba(211, 211, 211, 0.5);
  font-size: 1em;
  font-weight: 600;

  &::placeholder {
    color: rgb(0, 0, 0);
  }

  @media only screen and (max-width: 480px) {
    width: 60%;
    font-size: 0.8em;
  }
`;
const Button = styled.button`
  margin: 1em 0;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 600;
  padding: 0.5em 1.8em;
  border: none;
  border-radius: 5px;
  background: rgb(199, 199, 199);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background: rgb(163, 162, 162);
  }
`;
const LinkContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 480px) {
    width: 60%;
  }
`;

const Link = styled.a`
  font-size: 0.9em;
  color: rgb(165, 165, 165);

  &:hover {
    color: rgb(211, 211, 211);
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const nav = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    nav("/");
  };

  const history = useNavigate();
  const handleHistory = () => {
    history("/register");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Form>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching} to="/">
            Login
          </Button>
          <LinkContainer>
            <Link>Forgot password?</Link>
            <Link onClick={handleHistory}>Create new account</Link>
          </LinkContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
