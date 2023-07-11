import React from "react";
import { useSelector } from "react-redux";
export default function HistoryProduct() {
  const product = useSelector((state) => state.products);
  console.log(product);
  return (
    <div>
      <p>{product[1]?.name}</p>
    </div>
  );
}
