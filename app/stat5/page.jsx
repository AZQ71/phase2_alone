import React from 'react';
import * as repo from "@/app/lib/repo";
import Stat5 from '../components/Stat5'; 

// This is a server component
export default async function Page() {
  // Fetch data from the server-side
  const data = await repo.getTotalRevenueBySeller();

  return (
    <>
      <Stat5 data={data} />
    </>
  );
}
