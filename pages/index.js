import navigation from 'components/navigation'
import footer from 'components/footer'
import appConfig from 'config/app_config'

export default function Index(props) {
  const homeComponent = () => <h1>home</h1>

  return <>
    {navigation.bind(props)()}
    {homeComponent.bind(props)()}
    {footer.bind(props)()}
  </>
}

export async function getServerSideProps() {
  return { props: { ...appConfig } }
}