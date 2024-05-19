import React from 'react';
import * as repo from "@/app/lib/repo";
import Stat4 from '../components/Stat4'; 

// This is a server component
export default async function Page() {
  // Fetch data from the server-side
  const data = await repo.getNeverPurchasedTypes();

  return (
    <>
      <Stat4 data={data} />
    </>
  );
}
