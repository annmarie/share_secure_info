import React, { useState } from 'react';
import AddSecret from './AddSecret';
import SecretLink from './SecretLink';
import ViewSecret from './ViewSecret';

export default function HomeComponent(props) {
  const [link, setLink] = useState('');
  const [validUntil, setValidUntil] = useState('');

  const submitSecret = async (instruction, secret, validUntil) => {

    let dateObject = Date.now();
    dateObject += validUntil;

    const date = new Date(dateObject);
    const linkExpiresAtDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const linkExpiresAtTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    const msg = { link: secret, expiration: validUntil / 1000 }
    const response = await fetch('/api/test-redis', {
      method: 'POST',
      body: JSON.stringify({ msg }),
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
