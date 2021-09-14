import appConfig from 'app_config'
import navigationComponent from 'components/navigation-component'
import footerComponent from 'components/footer-component'

export default function Index(props) {
  const homeComponent = () => <h1>home</h1>

  return <>
    {navigationComponent.bind(props)()}
    {homeComponent.bind(props)()}
    {footerComponent.bind(props)()}
  </>
}

export async function getServerSideProps() {
  return { props: { ...appConfig } }
}