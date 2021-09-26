import { useEffect } from "react";
import Head from "next/head";
import HeaderComponent from "components/header-component";
import FooterComponent from "components/footer-component";
import "styles/globals.scss";

function ShareSecureApp({ Component, pageProps }) {
  useEffect(() => {
    // this is required for MUI
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>ShareSecure</title>
      </Head>

      <HeaderComponent {...pageProps} />
      <Component {...pageProps} />
      <FooterComponent {...pageProps} />
    </>
  );
}

export default ShareSecureApp;
