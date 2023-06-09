import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
  background: rgb(0, 0, 0);
  padding: 2em;
  color: rgb(219, 218, 218);
`;
const Wrapper = styled.div`
  display: flex;
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 90%;
  height: 95vh;
  object-fit: cover;
  padding: 1em;
  border: 1px solid rgb(172, 171, 171);
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 2em;
`;
const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 0.05em;
  font-size: 3em;
`;
const PriceContainer = styled.div`
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
`;
const PriceRegular = styled.span`
  border: 1px solid rgb(165, 164, 164);
  border-radius: 10px;
  width: fit-content;
  padding: 0.4em 0.5em;
  color: rgb(151, 151, 151);
  margin-bottom: 0.5em;
  font-family: "Teko", sans-serif;
  letter-spacing: 0.05em;
`;
const PriceDiscount = styled.span`
  border: 1px solid rgb(0, 163, 0);
  border-radius: 10px;
  width: fit-content;
  padding: 0.4em 0.5em;
  color: rgb(0, 163, 0);
  font-family: "Teko", sans-serif;
  letter-spacing: 0.05em;
`;
const Description = styled.p`
  margin: 2em 0;
  font-size: 1.2em;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  background: rgb(197, 197, 197);
  border: none;
  border-radius: 5px;
  font-size: 1.2em;

  &:hover {
    cursor: pointer;
    background: rgb(172, 172, 172);
  }
`;
const FilterContainer = styled.div`
  color: rgb(155, 154, 154);
`;
const FilterTitle = styled.span`
  font-size: 1.2em;
`;
const FilterSize = styled.select`
  margin: 0 0.5em;
  font-size: 1.2em;
  background: transparent;
  color: rgb(155, 154, 154);
  cursor: pointer;
  width: 4em;
`;
const FilterSizeOption = styled.option`
  background: rgb(66, 66, 66);
  color: rgb(219, 218, 218);
`;

const SingleProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + productId);
        setProduct(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [productId]);

  const handleClick = () => {
    setQuantity(quantity + 1);
    dispatch(
      addProduct({
        ...product,
        qty: quantity + 1,
        price: product.price * (quantity + 1),
        size,
      })
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <ImageContainer>
            <Image src={product.img} />
          </ImageContainer>
          <InfoContainer>
            <Title>{product.name}</Title>
            <PriceContainer>
              <PriceRegular>{product.price} EUR</PriceRegular>
              <PriceDiscount>LIFAD {product.lifad} EUR</PriceDiscount>
            </PriceContainer>
            <Button onClick={handleClick}>
              Add to cart
              <ShoppingCartOutlined style={{ marginLeft: ".5em" }} />
            </Button>
            <Description>{product.desc}</Description>
            <FilterContainer>
              <FilterTitle>Size:</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size.map((size) => (
                  <FilterSizeOption key={size}>{size}</FilterSizeOption>
                ))}
              </FilterSize>
            </FilterContainer>
          </InfoContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default SingleProduct;
