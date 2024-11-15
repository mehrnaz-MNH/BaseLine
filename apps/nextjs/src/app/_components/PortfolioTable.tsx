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
    <div className="w-full">
      <div className="flex items-center">
        <div className="flex w-full justify-between text-[10px] text-[#A5A5A5]">
          <div className="flex w-[35%]">
            <p className="">ASSET</p>
          </div>

          <div className="flex w-[33%]">
            <p className="w-full text-right">BALANCE</p>
          </div>

          <div className="flex w-[32%]">
            <p className="w-full text-right">VALUE</p>
          </div>
        </div>
      </div>
      <div className="mt-1 border-t border-[#212121] pb-3"></div>

      <div className="flex flex-col gap-2">
        {assets.map((asset) => (
          <AssetCard key={asset.symbol} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioTable;
