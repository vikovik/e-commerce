import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: rgb(0, 0, 0);
  color: rgb(204, 203, 203);
  height: fit-content;
`;

const Products = (cat, filter, sorts) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?categoryId=${cat.cat}`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat.cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(cat.filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filter]);

  console.log(cat);

  useEffect(() => {
    switch (cat.sorts) {
      case "regular": {
        setFilteredProducts((prev) =>
          [...prev].sort((a) => a.preorder === false)
        );
        break;
      }
      case "preorder": {
        setFilteredProducts((prev) =>
          [...prev].sort((a) => a.preorder === true)
        );
        break;
      }
      case "asc": {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
        break;
      }
      case "desc": {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
        break;
      }
      default:
        break;
    }
  }, [cat.sorts]);

  return (
    <Container>
      {filteredProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default Products;
