import React from 'react';
import * as repo from "@/app/lib/repo";
import Stat2 from '../components/Stat2'; 

// This is a server component
export default async function Page() {
  // Fetch data from the server-side
  const data = await repo.getBuyersPerLocation();

  return (
    <>
      <Stat2 data={data} />
    </>
  );
}
