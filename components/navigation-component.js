import Link from 'next/link'
import { useRouter } from "next/router";

const makeNavLink = (link) => {
  const router = useRouter();
  const { id, title, path } = link;

  return (router.pathname == path ) ? title :
    (<li key={id}><Link href={path}>{title}</Link></li>) 
}

export default function navigtionComponent() {
  return <>
    <nav>
      <ul>
        {this.navLinks.map(makeNavLink)}
      </ul>
    </nav>
  </>
}
