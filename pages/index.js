import React from 'react'
import { useState } from 'react'
import { useRouter } from "next/router"
import Head from 'next/head'
import _ from 'lodash'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import appPageHandler from 'middleware/app-page-handler'
import TestComponent from 'components/test-component'
import NavigationComponent from 'components/navigation-component'
import FooterComponent from 'components/footer-component'
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

  // set state hooks for pagePath value
  const router = useRouter();
  const [pagePath, setPagePath] = useState(_.get(router, 'asPath', ''))

  // render html page
  // ThemeProvider / CssBaseline is an attempt to add MUI
  // this might not be the right way to do it
  return <html>
    <Head>
      <title>Share Secure Info</title>
    </Head>

    <ThemeProvider>
      <CssBaseline />
    </ThemeProvider>

    <NavigationComponent pagePath={pagePath} setPagePath={setPagePath} { ...props } />
    <PageComponent pagePath={pagePath} { ...props } />
    <FooterComponent pagePath={pagePath} { ...props } />
  </html>
}

function PageComponent(props) {
  const path = _.get(props, 'pagePath')

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
  const reqPath = _.get(ctx, 'req.url')
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
