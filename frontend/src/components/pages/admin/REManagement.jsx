// components/AdminPage.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import PostList from "../../admin/real_estates/PostList";
import PostForm from "../../admin/real_estates/PostForm";
import "./admin.css";

const REManagement = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/post");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const updatePost = async (postId, updatedPost) => {
    try {
      await axios.put(`http://localhost:5000/post${postId}`, updatedPost);
      getPosts(); // Lấy danh sách người dùng mới sau khi cập nhật
      
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/post${postId}`);
      setPosts(posts?.content?.filter((post) => post._id !== postId));
      getPosts();
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="post-manage">
        <PostList
          posts={posts}
          deletePost={deletePost}
          updatePost={updatePost}
        />
        <PostForm></PostForm>
      </div>
    </div>
  );
};

export default REManagement;
