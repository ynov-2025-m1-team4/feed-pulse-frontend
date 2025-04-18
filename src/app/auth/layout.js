// app/auth/layout.js
// import "../../style/globals.scss";
import styles from "./layout.module.scss";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.image}>
              <img src="/logo.webp" alt="Image" />
            </div>
            <div className={styles.form}>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
