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
    <div className="flex items-center justify-between rounded-md bg-[#2F2E2E] p-4 text-white shadow-md hover:bg-[#9747FF]">
      {/* Image and Name*/}
      <div className="flex w-1/5 items-center justify-start md:justify-center">
        <img
          className="mr-4 w-5 md:w-9"
          src={asset.image}
          alt={`${asset.symbol} icon`}
          onError={(e) => {
            e.currentTarget.src = "/assets/color/generic.svg";
          }}
        />
        <div>
          <div className="text-sm font-semibold md:text-base lg:text-lg xl:text-xl">
            {asset.name}
          </div>
        </div>
      </div>

      {/* VALUE IN ETH */}
      <div className="flex w-1/4 justify-end md:justify-start">
        <span>
          {Number(asset.value_in_eth) === null ? "0.00" : asset.value_in_eth}{" "}
          {asset.symbol}
        </span>
      </div>

      {/* VALUE IN USD */}
      <div className="flex w-1/4 items-center">
        <div
          className={`rounded-md p-1 text-center`}
          style={{ width: "fit-content" }}
        >
          $ {asset.value_in_usd}
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
