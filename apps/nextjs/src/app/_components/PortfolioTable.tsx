import React from "react";

import AssetCard from "./AssetCard";

type Asset = {
  name: string;
  symbol: string;
  image: string;
  value_in_eth: string;
  value_in_usd: number;
};

interface Props {
  assets: Asset[];
}

const PortfolioTable: React.FC<Props> = ({ assets }) => {
  return (
    <div className="text-[11px w-full rounded-md bg-[#1E1E1E] p-6 shadow-xl sm:text-[13px] md:w-11/12 md:text-[15px] lg:w-4/5 lg:text-[18px] xl:w-3/5 xl:text-[20px]">
      <div className="mb-5 flex items-center rounded-md bg-[#2F2E2E] p-4">
        <div className="flex w-full justify-between text-center font-bold text-gray-400">
          <div className="w-1/10 flex items-center">
            <span>ASSET</span>
          </div>

          <div className="w-2/10 flex items-center">
            <span>BALANCE</span>
          </div>

          <div className="flex w-1/4 items-center">
            <span>VALUE</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {assets.map((asset) => (
          <AssetCard key={asset.symbol} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioTable;
