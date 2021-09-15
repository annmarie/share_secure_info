import appConfig from 'app_config'
import navigationComponent from 'components/navigation-component'
import footerComponent from 'components/footer-component'

const homeComponent = () => <h1>home</h1>

export default function Index(props) {
  return <>
    {navigationComponent.bind(props)()}
    {homeComponent.bind(props)()}
    {footerComponent.bind(props)()}
  </>
}

export async function getServerSideProps() {
  return { props: { ...appConfig } }
}
