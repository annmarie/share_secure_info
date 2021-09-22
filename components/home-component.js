import React, { useState } from 'react';
import AddSecret from './AddSecret';
import SecretLink from './SecretLink';

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

    const msg = { link: secret, expiration: validUntil }

    const response = await fetch('/api/test-redis', {
      method: 'POST',
      body: JSON.stringify({ msg }),
      headers: {
        'Content-type': 'application/json',
      }
    })
    const data = await response.json()
    console.log(data)
  }
  return <>
    {link ? <SecretLink link={link} validUntil={validUntil} /> : <AddSecret onSecretSubmit={submitSecret} />}
  </>
}
