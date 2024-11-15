type Asset = {
  name: string;
  symbol: string;
  image: string;
  value_in_eth: string;
  value_in_usd: number;
};

interface Props {
  asset: Asset;
}

const AssetCard: React.FC<Props> = ({ asset }) => {
  return (
    <div className="flex items-center justify-between text-white">
      {/* Image and Name*/}
      <div className="flex w-[35%] items-center">
        <img
          className="mr-4 h-[20px] w-[20px]"
          src={asset.image}
          alt={`${asset.symbol} icon`}
          onError={(e) => {
            e.currentTarget.src = "/assets/color/generic.svg";
          }}
        />

        <p className="w-full text-left text-[12px] font-bold">{asset.name}</p>
      </div>

      {/* VALUE IN ETH */}
      <div className="flex w-[32%] gap-1 text-right text-[13px] font-normal">
        <p className="w-full text-right">
          {Number(asset.value_in_eth) === null ? "0.00" : asset.value_in_eth}{" "}
          {asset.symbol}
        </p>
      </div>

      {/* VALUE IN USD */}
      <div className="flex w-[33%] text-right text-[13px] text-[#00FFD1]">
        <p className="w-full text-right">${asset.value_in_usd}</p>
      </div>
    </div>
  );
};

export default AssetCard;
