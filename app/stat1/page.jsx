import React from 'react';
import * as repo from "@/app/lib/repo";
import Stat1 from '../components/Stat1'; 

// This is a server component
export default async function Page() {
  // Fetch data from the server-side
  const data = await repo.getTotalPurchasesPerProductPerYear();

  return (
    <>
      <Stat1 data={data} />
    </>
  );
}
