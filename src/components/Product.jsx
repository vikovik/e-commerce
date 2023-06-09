import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Image = styled.img`
  height: 60vh;
  object-fit: cover;
`;
const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  color: rgb(207, 206, 206);
  font-size: 1.6em;
  letter-spacing: 0.05em;
  margin: 0.5em 0;
  width: 90%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 60vh;
  margin: 0.9em;
  border: 1px solid rgb(172, 171, 171);
  padding: 0.5em;

  &:hover {
    cursor: pointer;
  }
  &:hover ${Image} {
    filter: brightness(75%);
    transition: all 0.3s ease;
  }
  &:hover ${Title} {
    color: rgb(146, 146, 146);
  }
`;
const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PriceRegular = styled.span`
  color: rgb(165, 164, 164);
  border: 1px solid rgb(165, 164, 164);
  border-radius: 5px;
  padding: 0.2em 0.5em;
`;
const PriceDiscount = styled.span`
  color: rgb(0, 163, 0);
  border: 1px solid rgb(0, 163, 0);
  border-radius: 5px;
  padding: 0.2em 0.5em;
`;

const Product = ({ product }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/products/${product._id}`}>
      <Container>
        <Image src={product.img} />
        <Title>{product.name}</Title>
        <PriceContainer>
          <PriceRegular>{product.price} EUR</PriceRegular>
          <PriceDiscount>LIFAD {product.lifad} EUR</PriceDiscount>
        </PriceContainer>
      </Container>
    </Link>
  );
};

export default Product;
