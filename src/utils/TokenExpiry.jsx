import { jwtDecode } from "jwt-decode";

function TokenExpiry() {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    const now = Date.now() / 1000; // in seconds

    if (now >= exp) {
      localStorage.removeItem("authToken");
      return true;
    }

    return false;
  } catch (err) {
    localStorage.removeItem("authToken");
    return true;
  }
}

export default TokenExpiry;