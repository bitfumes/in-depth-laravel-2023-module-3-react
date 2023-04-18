import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    console.log("home");
  }, []);

  function logout() {
    Cookies.remove("token");
    fetch("http://localhost:8000/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    router.push("/login");
  }

  return (
    <div>
      Home
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
