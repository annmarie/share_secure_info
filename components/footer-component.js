import _ from 'lodash'
import styles from 'styles/components/Footer.module.scss'

export default function FooterComponent(props) {
  if (!props.useFooter) return ''

  const teamName = props.teamName;
  const teamMembers = props.teamMembers;
  const githubRepo = props.githubRepo

  return <>
    <div className={styles.footer}>
      <div className={styles.copyright}>Created with much <span className={styles.heart}> &#10084; </span> by <span className={styles.teamName}>{teamName}</span> for the MeredithCorp 2021 Hackathon</div>
      <div className={styles.copyright}>September 20th - 24th, 2021 </div>
      <br/>
      <a className={styles.link} href={githubRepo}>{githubRepo}</a>
      <br/>
      <div className={styles.copyright}><span className={styles.teamName__introduction}>{teamName}</span> is:</div>

      <ul className={styles.footerUl}>
        {_.map(teamMembers, (person, index) => (<li key={index}>{person}</li>))}
      </ul>

      <div className={styles.tiny}>huzzah!</div>
    </div>
  </>

}
