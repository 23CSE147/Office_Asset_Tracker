import { jwtDecode } from "jwt-decode";

const checkToken = () => {

  const token = localStorage.getItem("token");

  if (!token) return false;

  try {

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    // token expired
    if (decoded.exp < currentTime) {

      localStorage.clear();

      return false;
    }

    return true;

  } catch (error) {

    localStorage.clear();

    return false;
  }
};

export default checkToken;