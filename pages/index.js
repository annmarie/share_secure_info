import Link from 'next/link'
import { useRouter } from "next/router";
import _ from 'lodash'
import appConfig from 'app_config'
import TestComponent from 'components/test-component'
import { useState } from 'react';


const makeNavLink = (link, pagePath, setPagePath) => {
  const { id, title, path } = link;

  return (pagePath == path) ? title :
    <li key={id} onClick={(e) => setPagePath(path)} >
      <Link as={path} href="/"><a>{title}</a></Link>
    </li>
}

const HomeComponent = () => <h1>home</h1>

const NavigationComponent = (props) => {
  return <> 
    <nav>
      <ul>
        {props.navLinks.map(link => makeNavLink(link, props.pagePath, props.setPagePath))}
      </ul>
    </nav>
  </>
} 

const FooterComponent = (props) => {
  return <>
    <hr />
    <div>{props.footerText}</div>
  </>
}

const PageComponent = (props) => {
  return (props.pagePath == '/test') ? <TestComponent /> : <HomeComponent />
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
