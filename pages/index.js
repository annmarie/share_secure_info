import React from 'react'
import { useRouter } from "next/router"
import Head from 'next/head'
import _ from 'lodash'
import appPageHandler from 'middleware/app-page-handler'
import TestComponent from 'components/test-component'
import FooterComponent from 'components/footer-component'
import HomeComponent from "components/home-component"
import CryptoJS from 'crypto-js'

//Here's a test
const encrypted = CryptoJS.AES.encrypt('firstmessage','secret passphrase').toString();
const decrypted = CryptoJS.AES.decrypt(encrypted, 'secret passphrase');
const originalText = decrypted.toString(CryptoJS.enc.Utf8);

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

    <PageComponent { ...props } />
    <FooterComponent { ...props } /> 
  </>
}

function PageComponent(props) {
  const router = useRouter()
  const path = _.get(router, 'asPath', '/')
 
  switch(path) {
    case '/':
      return <HomeComponent { ...props } />
    case '/test':
      return <TestComponent { ...props } />
    default:
      return ''
  }
}

// using this instead of `getInitialProps`
export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res)
  const appConfig = ctx.req.appConfig
  _.set(appConfig, 'query', ctx.query)

  // pass config data to page props
  return { props: { ...appConfig } }
}
