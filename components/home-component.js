import React, { useState } from 'react';
import AddSecret from './AddSecret';
import SecretLink from './SecretLink';

export default function HomeComponent(props) {
  const [link, setLink] = useState('')

  const submitSecret = (instruction, secret, validUntil) => {
    // Call back-end api
    setLink(secret)
  }

  return <>
    { link ? <SecretLink link={link} /> : <AddSecret onSecretSubmit={submitSecret} /> }
  </>
}