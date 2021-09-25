import Logo from "svg/logo";
import styles from "styles/components/Header.module.scss";
import Link from "next/link";

export default function HeaderComponent(props) {
  if (!props.useHeader) return "";

  return (
    <div className={styles.logo}>
      <h2>
        <Link href="/">
          <a>ShareSecure <Logo {...props} /></a>
        </Link>
      </h2>
    </div>
  );
}
