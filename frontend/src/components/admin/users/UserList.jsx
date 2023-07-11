// components/UserList.js
import React, { useState } from "react";
import UserForm from "./UserForm";
import { toast } from "react-toastify";
import "./style.css";
const UserList = ({ users, deleteUser, updateUser }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState(null);

  const handleDeleteUser = (userId) => {
    const userToDelete = users?.content.find((user) => user._id === userId);

    if (
      userToDelete?.roles?.includes("admin") ||
      userToDelete?.roles?.includes("government")
    ) {
      toast.error("Cannot delete users with admin or government role.");
      return;
    }
    // Confirm delete user
    setConfirmDeleteUserId(userId);
  };

  const handleConfirmDelete = () => {
    // Confirm delete user và call deleteUser
    deleteUser(confirmDeleteUserId);
    setConfirmDeleteUserId(null);
  };

  const handleCancelDelete = () => {
    // cancel delete user
    setConfirmDeleteUserId(null);
  };
  const startEditingUser = (user) => {
    setEditingUser(user);
  };

  const closeModal = () => {
    setEditingUser(null);
  };
  if (!users || users.length === 0) {
    return <p>Not users.</p>;
  }

  return (
    <div className="user-list-container">
      <h2 className="section-title">User Management</h2>
      <table>
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role:</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.content?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => startEditingUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <UserForm
              editingUser={editingUser}
              updateUser={updateUser}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
      {confirmDeleteUserId && (
        <div className="delete-confirmation-box">
          <p>Are you sure you want to delete this user?</p>
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

export default UserList;
