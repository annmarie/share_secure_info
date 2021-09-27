import Head from "next/head";
import "styles/globals.scss";
import HeaderComponent from "components/header-component";
import FooterComponent from "components/footer-component";

function ShareSecureApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ShareSecure</title>
      </Head>
      <HeaderComponent {...pageProps} />
      <Component {...pageProps} />
      <FooterComponent {...props} />
    </>
  );
}

export default ShareSecureApp;
