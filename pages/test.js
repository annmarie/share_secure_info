import appConfig from 'app_config'
import navigationComponent from 'components/navigation-component'
import footerComponent from 'components/footer-component'
import testComponent from 'components/test-component'

export default function Test(props) {
  return <>
    {navigationComponent.bind(props)()}
    {testComponent.bind(props)()}
    {footerComponent.bind(props)()}
  </>
}

export async function getServerSideProps() {
  return { props: { ...appConfig } }
}
