import { useRouter } from "next/router";
import { useState } from 'react';
import _ from 'lodash'
import appConfig from 'app_config'
import TestComponent from 'components/test-component'
import NavigationComponent from 'components/navigation-component';
import FooterComponent from 'components/footer-component';
import HomeComponent from "components/home-component";

const PageComponent = (props) => {
  return (props.pagePath == '/test') ? 
    <TestComponent { ...props }/> : <HomeComponent { ...props } />
}

export default function Index(props) {
  const router = useRouter();
  const [pagePath, setPagePath] = useState(_.get(router, 'asPath', ''))

  return <>
    <NavigationComponent pagePath={pagePath} setPagePath={setPagePath} { ...props } />
    <PageComponent pagePath={pagePath} { ...props } />
    <FooterComponent pagePath={pagePath} { ...props } />
  </>
}

export async function getServerSideProps(ctx) {
  // validate request url
  const reqPath = _.get(ctx, 'req.url')
  const navPaths = appConfig.navLinks.map(navLink => navLink.path)
  navPaths.push('/_next/data/development/index.json')
  const validUrl = navPaths.includes(reqPath) ? true : false
  if (!validUrl) return { notFound: true }
  // assign page props
  return { props: { ...appConfig } }
}
