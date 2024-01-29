import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p>Logo</p>
        <div className={styles.rightSection}>
          <button className={styles.uploadButton}>
            <span>올리기</span>
          </button>
          <div className={styles.profileContainer}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
