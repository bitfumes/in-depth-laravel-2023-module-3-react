import Layout from "@/components/layouts/layout";
import "@/styles/globals.css";

import { AppContext } from "@/store/app";
import { ThemeProvider } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window["toast"] = toast;
  }, []);

  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  const [state, setState] = useState({
    isAuthenticated: false,
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      <ToastContainer />
      <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </AppContext.Provider>
  );
}
