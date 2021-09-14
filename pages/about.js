import navigation from 'components/navigation'
import footer from 'components/footer'
import appConfig from 'config/app_config'

export default function About(props) {
  const aboutComponent = () => <h1>about</h1>

  return <>
    {navigation.bind(props)()}
    {aboutComponent.bind(props)()}
    {footer.bind(props)()}
  </>
}

export async function getServerSideProps() {
  return { props: { ...appConfig } }
}