import React, { useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearWishlist, removeFromList } from "../redux/wishlistRedux";
import { addProduct } from "../redux/cartRedux";

const Container = styled.div`
  background: rgb(0, 0, 0);
  color: rgb(211, 211, 211);
  margin-top: 4em;

  @media only screen and (max-width: 480px) {
    width: 117%;
  }
`;
const Wrapper = styled.div`
  padding: 2em;
`;
const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  font-size: 3rem;
  text-align: center;
  letter-spacing: 0.05em;

  @media only screen and (max-width: 480px) {
    font-size: 2em;
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;

  @media only screen and (max-width: 480px) {
    padding: 1em;
    font-size: 0.8em;
  }
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

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;
const Text = styled.p`
  margin-right: 1em;
  font-size: 1.2em;
  color: rgb(168, 168, 168);
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: rgb(211, 211, 211);
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  flex: 1;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(173, 173, 173, 0.5);

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;
const ProductDetail = styled.div`
  flex: 1;
  display: flex;
  padding: 1em 0;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;
const Image = styled.img`
  width: 20vw;
  object-fit: cover;
  border: 1px solid rgb(172, 171, 171);
  padding: 0.5em;
`;
const Details = styled.div`
  color: rgb(168, 168, 168);
  display: flex;
  flex-direction: column;
  padding: 1em;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
    padding: 1em 0em;
  }
`;
const ProductName = styled.span`
  font-size: 1.7em;
  font-weight: 600;

  @media only screen and (max-width: 480px) {
    font-size: 1em;
  }
`;
const ProductSize = styled.span`
  font-size: 1.2em;
  margin: 1em 0;

  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
    margin: 0em;
  }
`;
const ProductId = styled.span`
  color: rgb(117, 117, 117);
  font-size: 0.8em;
  margin: 0.5em 0;

  @media only screen and (max-width: 480px) {
    font-size: 0.5em;
  }
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  font-size: 1.2em;
  justify-content: center;

  @media only screen and (max-width: 480px) {
    padding: 0;
    font-size: 0.8em;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
const ProductPrice = styled.span`
  font-size: 1.5em;
  color: rgb(117, 117, 117);
  margin-top: 1em;
`;
const ProductQty = styled.span`
  font-size: 1.2em;
  margin: 1em 0;

  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
    margin: 0em;
  }
`;
const DeleteButton = styled.button`
  padding: 0.5em 1em;
  margin: 1em 0;
  text-transform: uppercase;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: transparent;
  color: rgb(230, 230, 230);
  border: 1px solid rgb(170, 170, 170);

  &:hover {
    background: rgba(163, 162, 162, 0.3);
  }

  @media only screen and (max-width: 480px) {
    font-size: 0.7em;
    width: 40%;
  }
`;
const Message = styled.h2`
  text-align: center;
  font-size: 2em;
  margin: 2em 0 1em;
`;
const ClickMessage = styled.h3`
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  color: rgb(168, 168, 168);

  &:hover {
    color: rgb(211, 211, 211);
  }
`;
const Addbutton = styled.button`
  margin-top: 1em;
  text-transform: uppercase;
  font-size: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: transparent;
  color: rgb(2, 194, 2);
  border: 1px solid rgb(0, 163, 0);

  &:hover {
    background: rgba(0, 163, 0, 0.3);
  }

  @media only screen and (max-width: 480px) {
    font-size: 0.7em;
    width: 40%;
  }
`;

const Wishlist = () => {
  const cart = useSelector((state) => state.cart);
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const back = useNavigate();
  const toCart = useNavigate();

  const handleClearList = () => {
    dispatch(clearWishlist());
  };

  const handleDeleteItem = (id) => {
    dispatch(removeFromList(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
    dispatch(removeFromList(product._id));
  };

  const uniqueProducts = useMemo(() => {
    const prodMap = {};
    list.products.forEach((prod) => {
      const { _id, qty } = prod;
      if (!prodMap[_id] || qty >= prodMap[_id].qty) {
        prodMap[_id] = prod;
      }
    });
    const uniqueProducts = Object.values(prodMap);
    return uniqueProducts;
  }, [list.products]);

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Your Wishlist</Title>
          <Top>
            <TopButton
              onClick={() => {
                back("/");
              }}
            >
              Continue shopping
            </TopButton>
            <TextWrapper>
              <Text
                onClick={() => {
                  toCart("/cart");
                }}
              >
                Shopping Bag ({cart.qty})
              </Text>
              <Text>Your Wishlist ({list.qty})</Text>
            </TextWrapper>
            <TopButton onClick={handleClearList}>Clear Wishlist</TopButton>
          </Top>
          {list.products.length === 0 ? (
            <>
              <Message> You have no products in your wishlist</Message>
              <ClickMessage
                onClick={() => {
                  back("/");
                }}
              >
                Click here to add something!
              </ClickMessage>
            </>
          ) : (
            <Bottom>
              <Info>
                {uniqueProducts.map((product) => {
                  return (
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
                          <ProductQty>
                            <b>Quantity:</b> {product.qty}
                          </ProductQty>
                          <Addbutton onClick={() => handleAddToCart(product)}>
                            Add to cart
                          </Addbutton>
                          <DeleteButton
                            onClick={() => handleDeleteItem(product._id)}
                          >
                            Delete Item
                          </DeleteButton>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductPrice>{product.price} EUR</ProductPrice>
                      </PriceDetail>
                    </Product>
                  );
                })}
              </Info>
            </Bottom>
          )}
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Wishlist;
