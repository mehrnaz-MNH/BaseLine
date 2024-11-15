"use client";

import React from "react";
import PortfolioTable from "@/app/_components/PortfolioTable";
import { getAssets } from "@/app/lib/Utils";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";

const Page = () => {
  const account = useAccount();
  const address: string = account.address as string;
  const { data, error, isLoading, refetch, isFetching } = getAssets(address);
  const { data: userData } = api.user.byId.useQuery({ id: address });
  const user = (userData as any)?._doc;
  const username = user?.UserName;
  console.log(username);
  console.log(data);
  let AllAsset = (
    Array.isArray(data)
      ? data.reduce((acc, item) => acc + item.value_in_usd, 0)
      : 0
  ).toFixed(4);
  console.log(AllAsset);

  return (
    <div className="flex h-full flex-grow flex-col">
      <div className="flex flex-col py-3">
        {isFetching ? (
          <div className="my-4 h-4 w-4 animate-spin rounded-full border-2 border-[#00FFD1] border-t-transparent" />
        ) : (
          <p className="text-[23px] font-bold text-[#00FFD1]">
            {" "}
            $ <span className="text-[35px]">{AllAsset} </span>{" "}
          </p>
        )}

        <p className="mt-2 text-[11px] font-bold text-white">@ {username}</p>
      </div>
      {isLoading ? (
        <div></div>
      ) : error ? (
        <div></div>
      ) : (
        <>
          <PortfolioTable assets={data} isLoading={isFetching} />
          <div className="mt-auto pb-[13px]">
            <button
              type="submit"
              className="min-h-[52px] w-full rounded-[4px] bg-[#00FFD1] font-bold text-[#000000]"
              onClick={() => refetch()}
            >
              Refresh
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
