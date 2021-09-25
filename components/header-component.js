import Logo from "svg/logo";
import styles from "styles/components/Header.module.scss";

export default function HeaderComponent(props) {
  if (!props.useHeader) return "";

  return (
    <div className={styles.logo}>
      <h2>
        ShareSecure <Logo {...props} />
      </h2>
    </div>
  );
}
