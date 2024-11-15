"use client";

import React from "react";
import PortfolioTable from "@/app/_components/PortfolioTable";
import { getAssets } from "@/app/lib/Utils";
import { useAccount } from "wagmi";

const Page = () => {
  const account = useAccount();
  const address: string = account.address as string;
  const { data, error, isLoading } = getAssets(address);

  return (
    <div>
      {isLoading ? (
        <div>Loading..</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <PortfolioTable assets={data} />
      )}
    </div>
  );
};

export default Page;
