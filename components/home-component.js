import React, { useState } from 'react';
import AddSecret from './AddSecret';
import SecretLink from './SecretLink';
import { encryptSecret, decryptSecret } from '../providers/encryptionProvider';

export default function HomeComponent(props) {
  const [link, setLink] = useState('');
  const [validUntil, setValidUntil] = useState('');

  const submitSecret = async (instruction, secret, validUntil) => {

    let dateObject = Date.now();
    dateObject += validUntil;

    const date = new Date(dateObject);
    const linkExpiresAtDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const linkExpiresAtTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    setLink(secret);
    setValidUntil(`${linkExpiresAtDate} ${linkExpiresAtTime}`);

    const expireOn = validUntil / 1000;

    const content = {
      instruction: instruction,
      secret: secret,
      expireOn: expireOn
    }

    const encryptedSecret = encryptSecret(content);

    console.log(`encrypted msg: ${encryptedSecret}`);

    const response = await fetch('/api/secrets', {
      method: 'POST',
      body: JSON.stringify({ data: encryptedSecret, timeout: expireOn }),
      headers: {
        'Content-type': 'application/json',
      }
    });

    const data = await response.json()
    console.log(data)
  }
  return <>
    {link ? <SecretLink link={link} validUntil={validUntil} /> : <AddSecret onSecretSubmit={submitSecret} />}
  </>
}
