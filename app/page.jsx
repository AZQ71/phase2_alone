import Link from "next/link";
import styles from "./Home.module.css"; // Import CSS module for styling

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Statistics Home!</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead></thead>
          <tbody>
            <tr>
              <td><Link href="/stat1" className={styles.link}>Stat 1: Total amount of purchases per product and per year</Link></td>
              <td><Link href="/stat2" className={styles.link}>Stat 2: Buyers Per Location</Link></td>
              <td><Link href="/stat3" className={styles.link}>Stat 3: Most Bought Products Last 6 Months</Link></td>
              <td><Link href="/stat4" className={styles.link}>Stat 4:</Link></td>
              <td><Link href="/stat5" className={styles.link}>Stat 5</Link></td>
              <td><Link href="/stat6" className={styles.link}>Stat 6</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
