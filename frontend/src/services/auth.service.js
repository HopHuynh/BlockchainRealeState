const logout = () => {
  localStorage.removeItem("user");
  return null;
};

export default {
  logout,
};
