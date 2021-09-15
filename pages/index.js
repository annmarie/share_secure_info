import { useState } from 'react'
import { useRouter } from "next/router"
import Head from 'next/head'
import _ from 'lodash'
import appConfig from 'app_config'
import TestComponent from 'components/test-component'
import NavigationComponent from 'components/navigation-component'
import FooterComponent from 'components/footer-component'
import HomeComponent from "components/home-component"

export default function Index(props) {
  const router = useRouter();
  const [pagePath, setPagePath] = useState(_.get(router, 'asPath', ''))

  return <html>
    <Head>
      <title>Share Secure Info</title>
    </Head>
    <NavigationComponent pagePath={pagePath} setPagePath={setPagePath} { ...props } />
    <PageComponent pagePath={pagePath} { ...props } />
    <FooterComponent pagePath={pagePath} { ...props } />
  </html>
}

export async function getServerSideProps(ctx) {
  // validate request url
  const reqPath = _.get(ctx, 'req.url')
  const navPaths = appConfig.navLinks.map(navLink => navLink.path)
  // when the user clicks a LINK component
  // this is the value for req.url
  navPaths.push('/_next/data/development/index.json')
  const validUrl = navPaths.includes(reqPath) ? true : false
  if (!validUrl) return { notFound: true }
  // pass config data to page props
  return { props: { ...appConfig } }
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
