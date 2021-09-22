import React, { useState } from 'react';
import AddSecret from './AddSecret';
import SecretLink from './SecretLink';
import ViewSecret from './ViewSecret';
import CryptoJS from 'crypto-js'

export default function HomeComponent(props) {
  const [link, setLink] = useState('');
  const [validUntil, setValidUntil] = useState('');

  const submitSecret = async (instruction, secret, validUntil) => {

    let dateObject = Date.now();

    const date = new Date(dateObject);
    const linkExpiresAtDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const linkExpiresAtTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    const msg = { link: secret, comment: instruction }
    const encrypted = CryptoJS.AES.encrypt(msg,'secret passphrase').toString();
    const response = await fetch('/api/secret', {
      method: 'POST',
      body: JSON.stringify({ msg: encrypted, expiration: validUntil / 1000}),
      headers: {
        'Content-type': 'application/json',
      }
    })
    const data = await response.json()
    console.log(data)

    setLink(secret);
    setValidUntil(`${linkExpiresAtDate} ${linkExpiresAtTime}`);
  }

  // return <ViewSecret secret={'Hello this is secret'} />
  return link ? <SecretLink link={link} validUntil={validUntil} /> : <AddSecret onSecretSubmit={submitSecret} />
}
