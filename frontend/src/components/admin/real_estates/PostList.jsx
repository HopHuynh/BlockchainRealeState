// components/PostList.js
import React, { useState } from "react";
import PostForm from "./PostForm";
import { Link } from "react-router-dom";
import "./style.css";
const ProductList = ({ posts, deletePost, updatePost }) => {
  const [editingPost, setEditingPost] = useState(null);
  const [confirmDeletePostId, setConfirmDeletePostId] = useState(null);

  const handleDeletePost = (postId) => {
    // Confirm delete post
    setConfirmDeletePostId(postId);
  };

  const handleConfirmDelete = () => {
    // Confirm delete post và call deletePost
    deletePost(confirmDeletePostId);
    setConfirmDeletePostId(null);
  };

  const handleCancelDelete = () => {
    // Cancel delete post
    setConfirmDeletePostId(null);
  };
  const startEditingPost = (post) => {
    setEditingPost(post);
  };

  const closeModal = () => {
    setEditingPost(null);
  };
  if (!posts || posts.length === 0) {
    return <p>Not real estate.</p>;
  }
  return (
    <div className="post-list-container">
      <h2 className="section-title">Real Estate Management</h2>
      <table>
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Area (m²)</th>
            <th>Address</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
        
          {posts &&
            posts?.content?.map((post, index) => (
              
              <tr key={post._id}>
                <td>{index + 1}</td>
                <td>
                  <Link className="post-name" to={`/homepage/product`}>{post.name}</Link>
                </td>
                <td>{post.price}</td>
                <td>{post.area}</td>
                <td>{post.address}</td>
                {/* <td>
                  <button
                    className="edit-button"
                    onClick={() => startEditingPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
      {editingPost && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <PostForm
              editingPost={editingPost}
              updatePost={updatePost}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
      {confirmDeletePostId && (
        <div className="delete-confirmation-box">
          <p>Are you sure you want to delete this post?</p>
          <div className="confirmation-buttons">
            <button
              className="confirm-delete-button"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
            <button
              className="cancel-delete-button"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
