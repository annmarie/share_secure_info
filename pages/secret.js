import _ from 'lodash'
import { useState, useEffect } from 'react'
import appPageHandler from 'middleware/app-page-handler'
import { decryptSecret } from 'providers/encryptionProvider';
import ViewSecret from 'components/ViewSecret'
import Message from 'components/Message'

export default function Index(props) {
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

export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res)
  const appConfig = _.get(ctx, 'req.appConfig', {})
  _.set(appConfig, 'query', ctx.query)

  // pass config data to page props
  return { props: { ...appConfig } }
}
