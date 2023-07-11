// components/PostForm.js
import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import "./style.css";
const PostForm = ({ updatePost, editingPost }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (editingPost) {
      setName(editingPost.name);
      setPrice(editingPost.price);
      setArea(editingPost.area);
      setAddress(editingPost.address);
    } else {
      setName("");
      setPrice("");
      setArea("");
      setAddress("");
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editPost = { name, price, area, address}

    if (editingPost) {
      updatePost(editingPost._id, editPost);
      toast.success("Post updated successfully!");
      setName("");
      setPrice("");
      setArea("");
      setAddress("");
    } else {
      toast.error("Post created failed!");
    }
  };

  return (
    <div className="post-form-container">
      {editingPost ? (
        <>
          <h2 className="section-title">Edit Post</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="area">Area:</label>
            <input
              type="text"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>

            <button type="submit">Update</button>
          </form>
        </>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
};

export default PostForm;
