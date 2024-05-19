"use client"
import React from 'react';

export default function Stat2({ data }) {

    return (
        <div>
          <p>_sum: {data._sum}</p>
          <p>_count: {data._count}</p>
          <p>itemId: {data.itemId}</p>
          <p>date: {data.date}</p>
        </div>
      );

}
