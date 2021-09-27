import Head from "next/head";
import HeaderComponent from "components/header-component";
import FooterComponent from "components/footer-component";
import "styles/globals.scss";


function ShareSecureApp({ Component, pageProps }) {
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
