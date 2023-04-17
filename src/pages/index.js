import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("home");
  }, []);

  return <div>Home</div>;
}
