import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { decreaseQty, increaseQty } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  background: rgb(0, 0, 0);
  color: rgb(211, 211, 211);
`;
const Wrapper = styled.div`
  padding: 2em;
`;
const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  font-size: 3rem;
  text-align: center;
  letter-spacing: 0.05em;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  flex: 3;
`;
const Summary = styled.div`
  flex: 1;
  background: rgba(71, 71, 71, 0.3);
  height: fit-content;
  padding: 1em;
  margin: 1em 0;
  border-radius: 10px;
`;
const TopButton = styled.button`
  text-transform: uppercase;
  font-size: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    background: transparent;
    color: rgb(230, 230, 230);
    border: 1px solid rgb(230, 230, 230);
  }
  &:first-child:hover {
    background: rgba(163, 162, 162, 0.3);
  }
  &:last-child {
    background: transparent;
    color: rgb(2, 194, 2);
    border: 1px solid rgb(0, 163, 0);
  }
  &:last-child:hover {
    background: rgba(0, 163, 0, 0.3);
  }
`;
const TextWrapper = styled.div`
  display: flex;
`;
const Text = styled.span`
  margin-right: 1em;
  font-size: 1.2em;
  color: rgb(168, 168, 168);
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: rgb(211, 211, 211);
  }
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(173, 173, 173, 0.5);
`;
const ProductDetail = styled.div`
  flex: 3;
  display: flex;
  padding: 1em 0;
`;
const Image = styled.img`
  width: 20vw;
  object-fit: cover;
`;
const Details = styled.div`
  color: rgb(168, 168, 168);
  display: flex;
  flex-direction: column;
  padding: 1em;
`;
const ProductName = styled.span`
  font-size: 1.7em;
  font-weight: 600;
`;
const ProductSize = styled.span`
  font-size: 1.2em;
  margin: 1em 0;
`;
const ProductId = styled.span`
  color: rgb(117, 117, 117);
  font-size: 0.8em;
  margin: 0.5em 0;
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  font-size: 1.2em;
  justify-content: center;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Amount = styled.span`
  color: rgb(117, 117, 117);
  font-size: 1.2em;
  margin: 0 0.5em;
`;
const ProductPrice = styled.span`
  font-size: 1.5em;
  color: rgb(117, 117, 117);
  margin-top: 1em;
`;
const SummaryTitle = styled.h1`
  text-transform: uppercase;
  margin-bottom: 1em;
`;
const SummaryItem = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "1.3em"};
  border-top: ${(props) =>
    props.type === "total" && "1px dotted rgb(180, 180, 180)"};
  padding-top: ${(props) => props.type === "total" && "1em"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 600;
  padding: 0.5em 1em;
  border: 1px solid rgb(0, 163, 0);
  color: rgb(0, 163, 0);
  border-radius: 5px;
  width: 100%;
  background: transparent;

  &:hover {
    background: rgba(0, 163, 0, 0.3);
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const back = useNavigate();
  const dispatch = useDispatch();

  let shippingPrice = 10;
  let lifadDiscount = 0;
  let hstPercentage = 0.13;

  const handleContinue = () => {
    back("/");
  };

  const handleIncreaseQty = (productId) => {
    dispatch(increaseQty(productId));
  };

  const handleDecreaseQty = (productId) => {
    dispatch(decreaseQty(productId));
  };

  const uniqueProducts = useMemo(() => {
    const prodMap = {};
    cart.products.forEach((prod) => {
      const { _id, qty } = prod;
      if (!prodMap[_id] || qty >= prodMap[_id].qty) {
        prodMap[_id] = prod;
      }
    });
    const uniqueProducts = Object.values(prodMap);
    return uniqueProducts;
  }, [cart.products]);

  const subtotalPrice = useMemo(() => {
    return uniqueProducts.reduce((subtotal, product) => {
      const highestQtyProduct = cart.products.find(
        (p) => p._id === product._id
      );
      return subtotal + product.price * highestQtyProduct.qty;
    }, 0);
  }, [cart.products, uniqueProducts]);

  const totalPrice = useMemo(() => {
    return subtotalPrice * (1 + hstPercentage) + shippingPrice - lifadDiscount;
  }, [subtotalPrice]);

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Your cart</Title>
          <Top>
            <TopButton onClick={handleContinue}>Continue shopping</TopButton>
            <TextWrapper>
              <Text>Shopping Bag ({cart.qty})</Text>
              <Text>Your Wishlist (0)</Text>
            </TextWrapper>
            <TopButton>Checkout Now</TopButton>
          </Top>
          <Bottom>
            <Info>
              {uniqueProducts.map((product) => (
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>{product.name}</ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <AmountContainer>
                      <Add
                        onClick={() => dispatch(handleIncreaseQty(product._id))}
                      />
                      <Amount>{product.qty}</Amount>
                      <Remove
                        onClick={() => dispatch(handleDecreaseQty(product._id))}
                      />
                    </AmountContainer>
                    <ProductPrice>{product.price} EUR</ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>Order Summary</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal:</SummaryItemText>
                <SummaryItemPrice>{subtotalPrice} EUR</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping:</SummaryItemText>
                <SummaryItemPrice>{shippingPrice} EUR</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>LIFAD Discount:</SummaryItemText>
                <SummaryItemPrice>-{lifadDiscount} EUR</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>HST:</SummaryItemText>
                <SummaryItemPrice>{hstPercentage * 100} %</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total:</SummaryItemText>
                <SummaryItemPrice>{totalPrice.toFixed(2)} EUR</SummaryItemPrice>
              </SummaryItem>
              <Button>Checkout Now</Button>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
