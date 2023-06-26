import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCartOutlined, FavoriteBorder } from "@mui/icons-material";
import { Add, Remove } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { addProductList } from "../redux/wishlistRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  background: rgb(0, 0, 0);
  padding: 2em;
  color: rgb(219, 218, 218);
  margin-top: 4em;

  @media only screen and (max-width: 480px) {
    width: 100%;
    align-items: center;
  }
`;
const Wrapper = styled.div`
  display: flex;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
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

  @media only screen and (max-width: 480px) {
    width: 70vw;
    height: 50vh;
  }
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 2em;

  @media only screen and (max-width: 480px) {
    padding: 0;
  }
`;
const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 0.05em;
  font-size: 3em;

  @media only screen and (max-width: 480px) {
    font-size: 2em;
    margin-top: 0.5em;
    width: 90%;
  }
`;
const PriceContainer = styled.div`
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  font-size: 1.5em;

  @media only screen and (max-width: 480px) {
    flex-direction: row;
    gap: 1em;
    font-size: 1em;
  }
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
  align-items: center;
  display: flex;
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

  @media only screen and (max-width: 480px) {
    width: 70%;
  }
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
const AmountContainer = styled.div`
  margin: 2em 0;
  display: flex;
  align-items: center;
`;
const Amount = styled.span`
  color: rgb(153, 152, 152);
  font-size: 1.2em;
  margin: 0 0.5em;
  padding: 0.5em 1em;
  border: 1px solid rgb(153, 152, 152);
  border-radius: 5px;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
const Wishlist = styled.button`
  align-items: center;
  display: flex;
  padding: 0.5em 1em;
  background: transparent;
  border: 1px solid rgb(197, 197, 197);
  border-radius: 5px;
  margin-left: 1em;
  font-size: 1.2em;
  color: rgb(197, 197, 197);
  cursor: pointer;

  &:hover {
    background: rgba(163, 162, 162, 0.3);
  }
`;

const SingleProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
    setQuantity(quantity);
    dispatch(
      addProduct({
        ...product,
        qty: quantity,
        price: product.price * quantity,
        size,
      })
    );
  };

  const handleWishlist = () => {
    setQuantity(quantity);
    dispatch(
      addProductList({
        ...product,
        qty: quantity,
        size,
      })
    );
  };

  const handleQty = (type) => {
    if (type === "up") {
      setQuantity(quantity + 1);
    }
    if (type === "down" && quantity > 1) {
      setQuantity(quantity - 1);
    }
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

            {user.currentUser ? (
              <ButtonWrapper>
                <Button onClick={handleClick}>
                  Add to cart
                  <ShoppingCartOutlined style={{ marginLeft: ".5em" }} />
                </Button>
                <Wishlist onClick={handleWishlist}>
                  Add to wishlist
                  <FavoriteBorder style={{ marginLeft: ".3em" }} />
                </Wishlist>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper>
                <Button
                  onClick={() => alert("Please login to add products to cart")}
                >
                  Add to cart
                  <ShoppingCartOutlined style={{ marginLeft: ".5em" }} />
                </Button>
                <Wishlist
                  onClick={() =>
                    alert("Please login to add products to wishlist")
                  }
                >
                  Add to wishlist
                  <FavoriteBorder style={{ marginLeft: ".3em" }} />
                </Wishlist>
              </ButtonWrapper>
            )}

            <Description>{product.desc}</Description>
            <FilterContainer>
              <FilterTitle>Size:</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size.map((size) => (
                  <FilterSizeOption key={size} defaultValue="S">
                    {size}
                  </FilterSizeOption>
                ))}
              </FilterSize>
            </FilterContainer>
            <AmountContainer>
              <Add onClick={() => handleQty("up")} />
              <Amount>{quantity}</Amount>
              <Remove onClick={() => handleQty("down")} />
            </AmountContainer>
          </InfoContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default SingleProduct;
