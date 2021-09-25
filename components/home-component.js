import { useState } from "react";
import AddSecret from "./AddSecret";
import SecretLink from "./SecretLink";
import { encryptSecret } from "providers/encryptionProvider";

export default function HomeComponent() {
  const [link, setLink] = useState("");
  const [validUntil, setValidUntil] = useState("");

  const submitSecret = async (instruction, secret, validUntil) => {
    let dateObject = Date.now();
    dateObject += validUntil;

    const date = new Date(dateObject);
    const formatAMPM = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes.toString().padStart(2, "0");
      let strTime = `${hours}:${minutes} ${ampm}`;
      return strTime;
    };

    const linkExpiresAtDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const linkExpiresAtTime = formatAMPM(date);

    const msg = { link: secret, comment: instruction };
    const encrypted = encryptSecret(msg);
    const response = await fetch("/api/secret", {
      method: "POST",
      body: JSON.stringify({ msg: encrypted, expiration: validUntil / 1000 }),
      headers: {
        "Content-type": "application/json"
      }
    });
    const data = await response.json();

    setLink(data.id);
    setValidUntil(`${linkExpiresAtDate} ${linkExpiresAtTime}`);
  };

  return link ? <SecretLink link={link} validUntil={validUntil} /> : <AddSecret onSecretSubmit={submitSecret} />;
}
