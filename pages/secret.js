import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import appPageHandler from 'middleware/app-page-handler'
import { decryptSecret } from 'providers/encryptionProvider';
import ViewSecret from 'components/ViewSecret'
import Message from 'components/Message'

export default function Index(props) {
  const [secretMessage, setSecretMessage] = useState('');
  const [comment, setComment] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function getSecretMessage() {
      const result = await fetch(`/api/secret?id=${props.query.secret}`);
      const data = await result.json();

      if (data.val) {
        const decryptedData = decryptSecret(data.val)
        setSecretMessage(decryptedData.link)
        setComment(decryptedData.comment)
      }
    }

    getSecretMessage()
    setDataLoaded(true)
  }, [])

  const landingMessage = dataLoaded ? 'Secret message already seen' : 'Loading secret message...'
  return secretMessage 
    ? <ViewSecret secret={secretMessage} comment={comment} />
    : <Message text={landingMessage} />
}

// using this instead of `getInitialProps`
export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res)
  const appConfig = ctx.req.appConfig
  _.set(appConfig, 'query', ctx.query)

  // pass config data to page props
  return { props: { ...appConfig } }
}
