
import React from 'react';
import styles from '@/app/Home.module.css'; // Import CSS module for styling

export default function Stat2({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.statContainer}>
                <h2 className={styles.statTitle}>Buyers Per Location</h2>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Number of Buyers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.country}</td>
                                    <td>{item._count.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

