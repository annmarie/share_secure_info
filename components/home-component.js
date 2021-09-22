import React, { useState } from 'react';
import AddSecret from './AddSecret';
import SecretLink from './SecretLink';
import { encryptSecret } from 'providers/encryptionProvider';
import ViewSecret from './ViewSecret';
import CryptoJS from 'crypto-js'

export default function HomeComponent(props) {
  const [link, setLink] = useState('');
  const [validUntil, setValidUntil] = useState('');

  const submitSecret = async (instruction, secret, validUntil) => {

    let dateObject = Date.now();
    dateObject += validUntil

    const date = new Date(dateObject);
    const linkExpiresAtDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const linkExpiresAtTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    const msg = { link: secret, comment: instruction }
    const encrypted = encryptSecret(msg);
    const response = await fetch('/api/secret', {
      method: 'POST',
      body: JSON.stringify({ msg: encrypted, expiration: validUntil / 1000}),
      headers: {
        'Content-type': 'application/json',
      }
    })
    const data = await response.json()
    const id = data.id;

    setLink(id.split('|')[1]);
    setValidUntil(`${linkExpiresAtDate} ${linkExpiresAtTime}`);
  }

  return link ? <SecretLink link={link} validUntil={validUntil} /> : <AddSecret onSecretSubmit={submitSecret} />
}
