import styled from "styled-components";
import { popularProducts } from "../data.js";
import Product from "./Product.js";
import { useState, useEffect } from "react";
import axios from "axios"


const Container = styled.div`
padding:20px;
display:flex;
flex-wrap:wrap;
justify-content: space-between;
`
function Products({ cat, filters, sort }) {
  // console.log(cat,filters,sort)
  // Defining States
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
// Use Effect to fetch products from API
  useEffect(() => {
    const getProducts = async () => {
      try {
        // Getting Response from API through axios
        // Using category in template lateral
        const res = await axios.get(cat
           ? `http://localhost:7000/api/products?category=${cat}` 
           : `http://localhost:7000/api/products`)
        // console.log(res);
        // Setting Data from response to products
        setProducts(res.data);

      } catch (error) {
        console.log(error)
      }
    }
    getProducts();
  }, [cat])

// Use Effect to filter products according to category
useEffect(() => {
  cat &&
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
}, [products, cat, filters]);

// UseEffect to Sort Products
useEffect(() => {
  if (sort === "newest") {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.createdAt - b.createdAt)
    );
  } else if (sort === "asc") {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.price - b.price)
    );
  } else {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => b.price - a.price)
    );
  }
}, [sort]);


  return (
    <Container>
      { cat ? filteredProducts.map(
        (item,index) => {
          return <Product item={item} key={index}/>
        }
      ): products.slice(0,8).map(
        (item,index) => {
          return <Product item={item} key={index}/>
        }) }
    </Container>
  )
}

export default Products