import { SendOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background: rgb(0, 0, 0);
  color: rgb(204, 203, 203);
  align-items: center;
  justify-content: center;
  padding: 2em 2em 4em;

  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;
const Title = styled.h1`
  font-family: "Teko", sans-serif;
  font-size: 4em;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media only screen and (max-width: 480px) {
    font-size: 2.8em;
  }
`;
const Description = styled.div`
  font-size: 1.8em;
  width: 50%;
  text-align: center;
  margin: 0.8em 0;
  color: rgb(178, 177, 177);

  @media only screen and (max-width: 480px) {
    font-size: 1em;
  }
`;
const InputContainer = styled.div`
  width: 30%;
  height: 3em;
  background: rgb(15, 15, 15);
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 480px) {
    justify-content: space-evenly;
    width: 50%;
  }
`;
const Input = styled.input`
  border: none;
  background: transparent;
  flex: 8;
  padding-left: 1.5em;
  font-size: 1.2em;
  color: rgb(204, 203, 203);

  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
  }
`;
const Button = styled.button`
  background: transparent;
  color: rgb(204, 203, 203);
  border: none;
  flex: 1;
`;

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    axios
      .post("/send", { email })
      .then((res) => {
        console.log("Email sent: ", res.data);
        alert("Email sent: ", res.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
        alert("Error: ", error);
      });
  };
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        Subscribe to uor newsletter to get updates from your favourite products
      </Description>
      <InputContainer>
        <Input
          placeholder="Your Email"
          value={email}
          onChange={handleEmailChange}
        />
        <Button onClick={handleSubscribe}>
          <SendOutlined />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
