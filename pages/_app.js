import Head from "next/head";
import "styles/globals.scss";

function ShareSecureApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ShareSecure</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default ShareSecureApp;
