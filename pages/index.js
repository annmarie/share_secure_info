import React from 'react'
import { useRouter } from "next/router"
import Head from 'next/head'
import _ from 'lodash'
import appPageHandler from 'middleware/app-page-handler'
import TestComponent from 'components/test-component'
import NavigationComponent from 'components/navigation-component'
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

    <NavigationComponent { ...props } />
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

  // validate request url against the list of nav links from the config
  const [reqPath, _qs] = _.get(ctx, 'req.url', '').split('?')
  const appConfig = ctx.req.appConfig
  const navPaths = appConfig.navLinks.map(navLink => navLink.path)
  // if the user clicked a LINK component
  if (reqPath.match(/\/_next\/data\/.*\/index.json/)) {
    // add the url as valid 
    navPaths.push(reqPath)
  }
  const validUrl = navPaths.includes(reqPath) ? true : false

  // if no valid url path is found render 404 page
  if (!validUrl) return { notFound: true }

  // pass config data to page props
  return { props: { ...appConfig } }
}
