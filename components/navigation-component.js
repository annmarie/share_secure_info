import Link from 'next/link'
import _ from 'lodash'


const makeNavLink = (link, pagePath, setPagePath) => {
  const { id, title, path } = link;

  return (pagePath == path) ? title :
    <li key={id} onClick={(e) => setPagePath(path)} >
      <Link as={path} href="/"><a>{title}</a></Link>
    </li>
}

export default function NavigationComponent(props) {
  return <> 
    <nav>
      <ul>
        {props.navLinks.map(link => makeNavLink(link, props.pagePath, props.setPagePath))}
      </ul>
    </nav>
  </>
} 
