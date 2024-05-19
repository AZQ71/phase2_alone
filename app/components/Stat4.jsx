import React from 'react';
import styles from '@/app/Home.module.css'; 

export default function Stat4({ data }) {
  return (
    <div className={styles.statContainer}>
      <h2 className={styles.statTitle}>Top 3 Most Bought Products in Last 6 Months</h2>
      <div className={styles.statContent}>
        {data.map((item, index) => (
          <div key={index} className={styles.statItem}>
            <p><strong>Item ID:</strong> {item.itemId}</p>
            <p><strong>Quantity:</strong> {item._sum ? item._sum.quantity : 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


