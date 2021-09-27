import Head from "next/head";
import "styles/globals.scss";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import HeaderComponent from "components/header-component";
import FooterComponent from "components/footer-component";

function ShareSecureApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#673ab7"
      }
    }
  });

  return (
    <>
      <Head>
        <title>ShareSecure</title>
      </Head>
      <ThemeProvider theme={theme}>
        <HeaderComponent {...pageProps} />
        <Component {...pageProps} />
        <FooterComponent {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default ShareSecureApp;
