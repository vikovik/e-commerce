import { SendOutlined } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    background: rgb(0, 0, 0);
    color: rgb(204, 203, 203);
    align-items: center;
    justify-content: center;
    padding: 2em 2em 4em;
`
const Title = styled.h1`
    font-family: 'Teko', sans-serif;
    font-size: 4em;
    text-transform: uppercase;
    letter-spacing: .05em;
`
const Description = styled.div`
    font-size: 1.8em;
    width: 50%;
    text-align: center;
    margin: .8em 0;
    color: rgb(178, 177, 177);
`
const InputContainer = styled.div`
    width: 30%;
    height: 3em;
    background: rgb(15, 15, 15);
    display: flex;
    justify-content: space-between;
`
const Input = styled.input`
    border: none;
    background: transparent;
    flex: 8;
    padding-left: 1.5em;
    font-size: 1.2em;
    color: rgb(204, 203, 203);
`
const Button = styled.button`
    background: transparent;
    color: rgb(204, 203, 203);
    border: none;
    flex: 1;
`

const NewsLetter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Subscribe to uor newsletter to get updates from your favourite products</Description>
      <InputContainer>
        <Input placeholder="Your Email"/>
        <Button>
            <SendOutlined/>
        </Button>
      </InputContainer>
    </Container>
  )
}

export default NewsLetter
