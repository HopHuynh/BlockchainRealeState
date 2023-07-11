import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./productSlice";
export default function Product() {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);
  const [product, setProduct] = useState({ name: " ", price: " " });
  const handleIncreate = () => {
    setNumber(number + 1);
    const action = addProduct(product);
    dispatch(action);
  };
  const handleCreateProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    console.log(product);
  };

  return (
    <div>
      <input
        className="card-field-input"
        placeholder="text"
        name="name"
        value={product.name}
        onChange={handleCreateProduct}
      />
      <input
        className="card-field-input"
        placeholder="text"
        name="price"
        value={product.price}
        onChange={handleCreateProduct}
      />
      <button onClick={handleIncreate}>Increase number</button>
      <p>{number}</p>
    </div>
  );
}
