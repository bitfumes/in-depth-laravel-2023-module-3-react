import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Home() {
  const router = useRouter();
  useEffect(() => {
    console.log("home");
  }, []);

  async function logout() {
    const token = Cookies.get("token");

    const res = await fetch("http://localhost:8000/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) {
      Cookies.remove("token");
      router.push("/login");
    }
  }

  return (
    <div>
      Home
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default Home;
