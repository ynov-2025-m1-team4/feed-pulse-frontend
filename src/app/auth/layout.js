// app/auth/layout.js
// import "../../style/globals.scss";
import Image from "next/image";
import styles from "./layout.module.scss";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.image}>
              <Image src="/logo.webp" fill alt="Image" />
            </div>
            <div className={styles.form}>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
