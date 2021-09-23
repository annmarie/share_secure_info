import _ from 'lodash'
import { useState, useEffect } from 'react'
import appPageHandler from 'middleware/app-page-handler'
import ViewSecret from 'components/ViewSecret'
import Message from 'components/Message'
import HeaderComponent from 'components/header-component'
import FooterComponent from 'components/footer-component'

const SecretComponent = (props) => {
  const [secretData, setSecretData] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleSecretDestroy = () => {
    setSecretData('')
  }

  useEffect(() => {
    async function getSecretMessage() {
      const result = await fetch(`/api/secret?id=${props.query.secret}`);
      const data = await result.json();

      if (data.val) {
        setSecretData(data.val);
      }
    }

    getSecretMessage()
    setDataLoaded(true)
  }, [])

  const landingMessage = dataLoaded ? 'Secret message already seen' : 'Loading secret message...'

  return secretData
    ? <ViewSecret secretData={secretData} onSecretDestroy={handleSecretDestroy} />
    : <Message text={landingMessage} />
}

export default function Secret(props) {

  return <>
    <Head>
      <title>ShareSecure</title>
    </Head>

    <HeaderComponent {...props} />
    <SecretComponent {...props} />
    <FooterComponent {...props} />
  </>
}

export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res)
  const appConfig = _.get(ctx, 'req.appConfig', {})
  _.set(appConfig, 'query', ctx.query)

  // pass config data to page props
  return { props: { ...appConfig } }
}
