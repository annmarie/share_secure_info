import React, { useState } from 'react';
import AddSecret from './AddSecret';
import SecretLink from './SecretLink';

export default function HomeComponent(props) {
  const [link, setLink] = useState('');
  const [validUntil, setValidUntil] = useState('');

  const submitSecret = (instruction, secret, validUntil) => {
    
    let dateObject = Date.now();
    dateObject += validUntil;

    const date = new Date(dateObject);
    const linkExpiresAtDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const linkExpiresAtTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    setLink(secret);
    setValidUntil(`${linkExpiresAtDate} ${linkExpiresAtTime}`);
  }

  return <>
    { link ? <SecretLink link={link} validUntil={validUntil} /> : <AddSecret onSecretSubmit={submitSecret} /> }
  </>
}
