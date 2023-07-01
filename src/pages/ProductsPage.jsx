import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const Container = styled.div`
  background: rgb(0, 0, 0);
  color: rgb(219, 218, 218);
  padding: 2em;
  margin-top: 4em;

  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;
const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  font-size: 3em;
  letter-spacing: 0.05em;

  @media only screen and (max-width: 480px) {
    font-size: 2em;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2em 0;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;
const Filter = styled.div`
  margin: 0 1em;

  @media only screen and (max-width: 480px) {
    margin: 0.5em 0;
  }
`;
const FilterText = styled.span`
  font-size: 1.2em;

  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
  }
`;
const Select = styled.select`
  padding: 0.5em;
  margin: 0 0.5em;
  background: transparent;
  color: rgb(219, 218, 218);
  font-size: 0.8em;
  cursor: pointer;
`;
const Option = styled.option`
  background: rgb(66, 66, 66);
  color: rgb(219, 218, 218);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const BackButton = styled.button`
  margin-right: 1em;
  cursor: pointer;
  border: 1px solid rgb(219, 218, 218);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.5em;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ProductsPage = () => {
  const location = useLocation();
  const categoryId = location.pathname.split("/")[3];
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("regular");
  const history = useNavigate();

  const handleFilters = (e) => {
    const val = e.target.value;
    setFilters({
      [e.target.name]: val,
    });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <BackButton onClick={() => history(-1)}>
            <ArrowBack />
          </BackButton>
          <Title>{category}</Title>
        </Wrapper>
        <FilterContainer>
          <Filter>
            <FilterText>
              Filter Products:
              <Select name="size" onChange={handleFilters}>
                <Option defaultValue={"size"}>Size</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                <Option>XXL</Option>
                <Option>3XL</Option>
                <Option>4XL</Option>
                <Option>5XL</Option>
              </Select>
            </FilterText>
          </Filter>
          <Filter>
            <FilterText>
              Sort Products:
              <Select onChange={(e) => setSort(e.target.value)}>
                <Option defaultValue={"regular"} value={"regular"}>
                  Regular
                </Option>
                <Option value={"preorder"}>Preorder</Option>
                <Option value={"asc"}>Low to High</Option>
                <Option value={"desc"}>High to Low</Option>
              </Select>
            </FilterText>
          </Filter>
        </FilterContainer>
        <Products cat={categoryId} filter={filters} sorts={sort} />
      </Container>
      <Footer />
    </>
  );
};

export default ProductsPage;
