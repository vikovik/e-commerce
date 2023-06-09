import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { clearCart } from "../redux/cartRedux";

const Container = styled.div`
  height: fit-content;
  background: rgb(15, 15, 15);
  color: rgb(206, 206, 205);
  ${mobile({
    width: "100%",
  })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    padding: "1em 0",
    fontSize: "90%",
  })}
`;
/*--------------Left styled components-----------------*/
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;

  ${mobile({
    display: "none",
  })}
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 1.5em;
  padding: 0.5em;
  height: 1.5em;
  background: rgb(40, 40, 40);
`;
const Button = styled.button`
  background: transparent;
  color: rgb(204, 203, 203);
  border: none;
  flex: 1;
`;
const Input = styled.input`
  border: none;
  margin-right: 0.3em;
  background: transparent;
  color: rgb(206, 206, 205);
  flex: 5;

  ${mobile({
    width: "50%",
  })}
`;
/*--------------Center styled components-----------------*/
const Center = styled.div`
  flex: 2;
`;
const Logo = styled.h1`
  font-family: "Teko", sans-serif;
  text-transform: uppercase;
  text-align: center;
  font-size: 2.5em;

  ${mobile({
    fontSize: "2em",
  })}
`;
/*--------------Right styled components-----------------*/
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({
    fontSize: "70%",
  })}
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
  const dispatch = useDispatch();

  const handleLogin = () => {
    login("/login");
  };
  const handleRegister = () => {
    register("/register");
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Button>
              <Search />
            </Button>
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Ramm-Shop</Logo>
        </Center>
        <Right>
          {user.currentUser ? (
            <>
              <Menu>{user.currentUser.firstName}</Menu>
              <Menu onClick={handleLogout}>Sign-out</Menu>
            </>
          ) : (
            <>
              <Menu onClick={handleRegister}>Register</Menu>
              <Menu onClick={handleLogin}>Login</Menu>
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
