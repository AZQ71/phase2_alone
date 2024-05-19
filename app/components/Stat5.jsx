'use client'
import React from 'react';
import styles from '@/app/Home.module.css';

export default function Stat5({ data }) {
    return (
        <div>
            {data.map((item, index) => (
                <div key={index} className={styles.container}>
                    <p className={styles.seller}>Seller: {item.owner_username}</p>
                    <p className={styles.revenue}>Total Revenue: {item._sum.price}</p>
                </div>
            ))}
        </div>
    );
}

