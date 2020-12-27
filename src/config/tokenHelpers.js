import axios from "axios";

export const isTokenSet = () => {
  return localStorage.getItem("authToken")?.length > 0;
};

export default function setAuthorizationToken(token = null) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export const initalizeAuthorization = () =>
  isTokenSet()
    ? setAuthorizationToken(localStorage.getItem("authToken"))
    : null;
