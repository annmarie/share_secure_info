import _ from 'lodash'
import { useEffect } from 'react'
import Head from 'next/head'
import appPageHandler from 'middleware/app-page-handler'
import FooterComponent from 'components/footer-component'
import HeaderComponent from 'components/header-component'
import StepsComponent from 'components/steps-component'
import HomeComponent from "components/home-component"

export default function Index(props) {
  // this is similar to using componentDidMount
  useEffect(() => {
    // this is required for MUI
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // render html page
  return <>
    <Head>
      <title>ShareSecure</title>
    </Head>

    <HeaderComponent { ...props } />
    <HomeComponent { ...props } />
    <StepsComponent { ...props} />
    <FooterComponent { ...props } /> 
  </>
}

// using this instead of `getInitialProps`
export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res)
  const appConfig = ctx.req.appConfig

  // pass config data to page props
  return { props: { ...appConfig } }
}
