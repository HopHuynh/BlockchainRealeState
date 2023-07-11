// components/AdminPage.js
import React, { useState } from "react";
import UserManagement from "./UserManagement";
import REManagement from "./REManagement";
import "./admin.css";

const AdminPage = () => {

  const [selectedOption, setSelectedOption] = useState("users");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="admin-page">
      <h1>Owner</h1>
      <div className="admin-container">
        <div className="select-container">
        <select
          className="select-option"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="users">User management</option>
          <option value="products">Real estate management</option>
        </select>
      </div>
      {selectedOption === "users" ? <UserManagement /> : <REManagement />}
    
      </div>
    </div>
  );
};

export default AdminPage;
