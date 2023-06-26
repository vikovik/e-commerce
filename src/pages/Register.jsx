import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
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
const Agreement = styled.div`
  width: 40%;
  color: rgb(165, 165, 165);
  margin: 0.7em 0;
  font-size: 0.8em;

  @media only screen and (max-width: 480px) {
    width: 60%;
  }
`;
const Button = styled.button`
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 600;
  padding: 0.5em 1.8em;
  border: none;
  border-radius: 5px;
  background: rgb(199, 199, 199);
  cursor: pointer;

  &:hover {
    background: rgb(163, 162, 162);
  }
`;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { firstName, lastName, email, password });
    history("/login");
  };
  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form>
          <Input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input placeholder="Confirm Password" type="password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the Privacy Policy.
          </Agreement>
          <Button onClick={handleClick} path="/login">
            Create
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
