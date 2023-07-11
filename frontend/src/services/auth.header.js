export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { authorization: `Bearer ${user.accessToken}` };
  } else {
    return {};
  }
}
