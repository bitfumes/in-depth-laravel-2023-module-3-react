import Cookies from "js-cookie";

export default async function http(url, options) {
  const token = Cookies.get("token");
  options = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return await fetch(`http://localhost:8000/api/${url}`, options);
}
