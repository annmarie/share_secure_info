import testComponent from 'components/test-component'
import navigation from 'components/navigation'
import footer from 'components/footer'
import appConfig from 'config/app_config'

export default function Test(props) {
  return <>
    {navigation.bind(props)()}
    {testComponent.bind(props)()}
    {footer.bind(props)()}
  </>
}

export async function getServerSideProps() {
  return { props: { ...appConfig } }
}
