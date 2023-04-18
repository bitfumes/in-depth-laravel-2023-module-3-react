import "@/styles/globals.css";

import { ThemeProvider } from "@material-tailwind/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window["toast"] = toast;
  }, []);

  return (
    <>
      <ToastContainer />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
