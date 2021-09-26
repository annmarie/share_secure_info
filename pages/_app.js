import { useEffect } from "react";
import Head from "next/head";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
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

  const theme = createTheme({
    palette: {
      primary: {
        main: "#673ab7",
      },
    },
  });
  
  return (
    <>
      <Head>
        <title>ShareSecure</title>
      </Head>

      <MuiThemeProvider theme={theme}>
        <HeaderComponent {...pageProps} />
        <Component {...pageProps} />
        <FooterComponent {...pageProps} />
      </MuiThemeProvider>
    </>
  );
}

export default ShareSecureApp;
