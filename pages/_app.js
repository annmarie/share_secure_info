import Head from "next/head";
import "styles/globals.scss";
import HeaderComponent from "components/header-component";
import FooterComponent from "components/footer-component";
//import Layout from "components/Layout";
//<Layout {...pageProps}></Layout>

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
