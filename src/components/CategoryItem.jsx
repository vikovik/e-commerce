import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  opacity: 0;
  border: none;
  padding: 0.6em 1.5em;
  font-family: "Teko", sans-serif;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 1.5em;
  background: rgba(172, 171, 171, 0.7);
  cursor: pointer;

  &:hover {
    background: rgb(151, 151, 151);
    transform: scale(1.05);
    transition: all 0.3s ease;
  }
`;

const Image = styled.img`
  height: 60vh;
  object-fit: cover;
  filter: brightness(70%);
`;

const Container = styled.div`
  display: flex;
  margin: 0.9em;
  height: 60vh;
  position: relative;
  border: 1px solid rgb(172, 171, 171);
  padding: 0.5em;

  &:hover {
    cursor: pointer;
  }
  &:hover ${Button} {
    opacity: 1;
  }
  &:hover ${Image} {
    filter: brightness(40%);
    transition: all 0.3s ease;
  }
`;

const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-family: "Bebas Neue", sans-serif;
  font-size: 4em;
  letter-spacing: 0.05em;
  margin-bottom: 0.5em;
  color: rgb(216, 216, 216);
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.name}/${item.id}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.name}</Title>
          <Button>Shop now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
