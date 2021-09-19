import React from 'react';
import { useState } from 'react'
import { useRouter } from "next/router"
import Head from 'next/head'
import _ from 'lodash'
import appPageHandler from 'middleware/app-page-handler';
import appConfig from 'app-config'
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
  return <html>
    <Head>
      <title>Share Secure Info</title>
    </Head>
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
export async function getServerSideProps(ctx) {
  // middleware - NOT WORKING
  // this is not quite right 
  // we might not need middleware to solve our problem
  // but it would be more correct
  //await appPageHandler(ctx.req, ctx.res, () => {})

  // validate request url against the list of nav links from the config
  const reqPath = _.get(ctx, 'req.url')
  const navPaths = appConfig.navLinks.map(navLink => navLink.path)
  // when the user clicks a LINK component
  // this is the value for req.url
  navPaths.push('/_next/data/development/index.json')
  const validUrl = navPaths.includes(reqPath) ? true : false
  // if no valid url path is found render 404 page
  if (!validUrl) return { notFound: true }
  // pass config data to page props
  return { props: { ...appConfig } }
}
