import _ from 'lodash'
import styles from 'styles/components/Steps.module.scss'

export default function StepsComponent(props) {

  return <>
    <div>
      <h2>Self-destructing links</h2>
      <p>On occasion, there is a need for sharing sensitive information between co-workers.  With this app, you can send this info --a "secret"-- directly to a person via a link that destroys itself after a specified amount of time so that no one else can access it.</p>

      <h2>How to use</h2>
      <ul className={styles.steps}>
        <li>
            <h3>Instructions <span className={styles.lightItalic}>optional</span></h3>
            <p>If your secret needs an explanation of how to use it, when to use it, etc, you can add here and it will be sent along with the sensitive info you are sharing, and will be included in the encryption of the secret.</p>
        </li>
        <li>
          <h3>Secret</h3>
          <p>The field to add your sensitive information. If needed, instructions for use (see #1) can be included, and will be encrypted along with the secret.</p>
        </li>
        <li>
          <h3>Valid Until</h3>
          <p>In this field, you can set how long you would like the link to the sensitive info to remain active.  This can be set in minutes, hours or days.</p>
        </li>
      </ul>
      <h3>The Encrypted Link</h3>
          <p>After submitting, a link will be created and presented on the page, with a note as to how long the link will be valid for, and an explanation of how long you will have to copy the secret once you visit the link.</p>
          <p>If needed, you can copy the whole message to the clipboard to save for later, or, you can just copy the link itself.</p>
    </div>
  </>
}
