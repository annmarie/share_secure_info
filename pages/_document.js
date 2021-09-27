import Document, { Html, Head, Main, NextScript } from "next/document";

class ShareSecureDocument extends Document {
  static async getInitialProps(ctx) {
    const initProps = await Document.getInitialProps(ctx);
    return { ...initProps };
  }

  componentDidMount() {
    // this is required for MUI
    console.log("Removed the server-side injected CSS.");
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ShareSecureDocument;
