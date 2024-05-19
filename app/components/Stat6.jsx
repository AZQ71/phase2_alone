import React from 'react';
import styles from '@/app/Home.module.css'; 

export default function Stat6({ data }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Top Buyers</h2>
      <div className={styles.content}>
        {data.map((item, index) => (
          <div key={index} className={styles.table}>
            <p className={styles.tableCell}>Username: {item.username}</p>
            <p className={styles.tableCell}>Money Balance: {item.money_balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
