import React from 'react'
import Head from 'next/head'
import _ from 'lodash'
import appPageHandler from 'middleware/app-page-handler'
import FooterComponent from 'components/footer-component'
import StepsComponent from 'components/steps-component'
import HomeComponent from "components/home-component"

export default function Index(props) {
  // this is simpilar to using componentDidMount
  React.useEffect(() => {
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
      <title>Share Secure Info</title>
    </Head>

    <HomeComponent { ...props } />
    <StepsComponent { ...props} />
    <FooterComponent { ...props } /> 
  </>
}

// using this instead of `getInitialProps`
export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res)

  // pass config data to page props
  return { props: { ...appConfig } }
}
