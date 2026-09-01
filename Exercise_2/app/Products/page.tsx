import React from "react";

const Products = async () => {
  const req = await fetch("https://dummyjson.com/products");
  const response = await req.json();
  return(
    <>
    {
        response.products.map((product: any) => (
            <div key={product.id}>
             <h1>{product.title}</h1>
             <p>{product.description}</p>
             <h2>{product.category}</h2>
             <strong>{product.price}</strong>
             <span>{product.rating}</span>
            </div>
        ))
    }
    </>
  )
};

export default Products;
