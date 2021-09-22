import Link from 'next/link'
import _ from 'lodash'
import { useState } from 'react'
import { useRouter } from "next/router"

const makeNavLink = (link, pagePath, setPagePath) => {
  const { id, title, path } = link;

  return (pagePath == path) ? <li key={id}>{title}</li> :
    <li key={id} onClick={(e) => setPagePath(path)} >
      <Link as={path} href="/"><a>{title}</a></Link>
    </li>
}

export default function NavigationComponent(props) {
  if (!props.useNavigation) return ''

  // set state hooks for pagePath value
  const router = useRouter();
  const [pagePath, setPagePath] = useState(_.get(router, 'asPath', ''))

  return <> 
    <nav>
      <ul>
        {props.navLinks.map(link => makeNavLink(link, pagePath, setPagePath))}
      </ul>
    </nav>
  </>
} 
