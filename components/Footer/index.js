import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="#" target="_blank" rel="noopener noreferrer">
        V.0.0.1
        <span className={styles.logo}>
          <img src="icons/logo.png" alt="Logo" width={16} height={16} />
        </span>
      </a>
    </footer>
  );
}
