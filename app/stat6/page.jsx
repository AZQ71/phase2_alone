import React from 'react';
import * as repo from "@/app/lib/repo";
import Stat6 from '../components/Stat6'; 

// This is a server component
export default async function Page() {
  // Fetch data from the server-side
  const data = await repo.gettopBuyersByMoneyBalance();

  return (
    <>
      <Stat6 data={data} />
    </>
  );
}
