import React from "react";
import styled from "styled-components";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { clearCart } from "../redux/cartRedux";

const Container = styled.div`
  height: 4em;
  background: rgb(15, 15, 15);
  color: rgb(206, 206, 205);
  position: fixed;
  inset: 0;
  z-index: 100;
`;
const Wrapper = styled.div`
  padding: 0.5em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/*--------------Center styled components-----------------*/
const Center = styled.div`
  flex: 1;
`;
const Logo = styled.h1`
  font-family: "Teko", sans-serif;
  text-transform: uppercase;
  text-align: left;
  font-size: 2.5em;
  cursor: pointer;

  @media only screen and (max-width: 480px) {
    font-size: 1.5em;
  }
`;
/*--------------Right styled components-----------------*/
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 480px) {
    font-size: 0.7em;
  }
`;
const Menu = styled.div`
  font-size: 1em;
  text-transform: uppercase;
  cursor: pointer;
  margin-left: 1em;
  color: rgb(199, 198, 198);
`;

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const login = useNavigate();
  const register = useNavigate();
  const home = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <Container>
      <Wrapper>
        <Center>
          <Logo
            onClick={() => {
              home("/");
            }}
          >
            Ramm-Shop
          </Logo>
        </Center>
        <Right>
          {user.currentUser ? (
            <>
              <Menu>{user.currentUser.firstName}</Menu>
              <Menu onClick={handleLogout}>Sign-out</Menu>
            </>
          ) : (
            <>
              <Menu
                onClick={() => {
                  register("/register");
                }}
              >
                Register
              </Menu>
              <Menu
                onClick={() => {
                  login("/login");
                }}
              >
                Login
              </Menu>
            </>
          )}
          <Link to="/cart">
            <Menu>
              <Badge badgeContent={cart.qty} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Menu>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
