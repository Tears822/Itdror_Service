import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div id="clouds" aria-hidden>
        <div className={`${styles.cloud} ${styles.x1}`} />
        <div className={`${styles.cloud} ${styles.x1_5}`} />
        <div className={`${styles.cloud} ${styles.x2}`} />
        <div className={`${styles.cloud} ${styles.x3}`} />
        <div className={`${styles.cloud} ${styles.x4}`} />
        <div className={`${styles.cloud} ${styles.x5}`} />
      </div>
      <div className={styles.content}>
        <div className={styles.title404}>404</div>
        <hr className={styles.divider} />
        <div className={styles.line1}>THE PAGE</div>
        <div className={styles.line2}>WAS NOT FOUND</div>
        <div className={styles.btnWrap}>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
