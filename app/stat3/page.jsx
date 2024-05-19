import React from 'react';
import * as repo from "@/app/lib/repo";
import Stat3 from '../components/Stat2'; 

// This is a server component
export default async function Page() {
  // Fetch data from the server-side
  const data = await repo.getBuyersPerLocation();

  return (
    <>
      <Stat3 data={data} />
    </>
  );
}
