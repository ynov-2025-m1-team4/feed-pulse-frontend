/* import Header from "@/components/Header"; */
import Sidebar from "@/components/Sidebar";
import styles from "./page.module.scss";

export default function Layout({ children }) {
    return (
        <>
            <div id="site" className={styles.wrapper}>
                <Sidebar className={styles.side} />
                <header className={styles.head}>
                        {children}
                        <select className={styles.select}>
                            <option value="en">Select a platform</option>
                        </select>                    
                </header>
                <article className={styles.lists}>
                    <section className={styles.main}>
                        <div className={styles.div}>
                            <h2 className={styles.littleTitle}>commentaire</h2>
                            <p>J&apos;adore ce produit ! .............</p>
                            <p>J&apos;adore ce produit ! .............</p>
                        </div>
                    </section>

                    <section className={styles.main}>
                        <h2 className={styles.littleTitle}>Platform</h2>
                        <p>Amazon</p>
                        <p>Amazon</p>
                    </section>                    
                </article>
            </div>
        </>
    )
}