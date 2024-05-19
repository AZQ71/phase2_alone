import React from 'react';
import styles from '@/app/Home.module.css'; // Import CSS module for styling

export default function Stat1({ data }) {
    return (
        <div className={styles.statContainer}>
            <h2 className={styles.statTitle}>Statistics Details:</h2>
            <div className={styles.statContent}>
                <p><strong>Sum:</strong> {data._sum}</p>
                <p><strong>Count:</strong> {data._count}</p>
                <p><strong>Item ID:</strong> {data.itemId}</p>
                <p><strong>Date:</strong> {data.date}</p>
            </div>
        </div>
    );
}
