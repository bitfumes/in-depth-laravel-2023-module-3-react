import http from "@/utility/http";
import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  async function logout() {
    const res = await http("user/logout");

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
