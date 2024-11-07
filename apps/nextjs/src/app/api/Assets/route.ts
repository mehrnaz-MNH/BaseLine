import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BigNumberish, ethers } from "ethers";

// URLS
const api_key = process.env.NEXT_PUBLIC_API_KEY;
const ALCHEMY_URL = `https://eth-sepolia.g.alchemy.com/v2/${api_key}`;
const BS_URL = `https://eth-sepolia.blockscout.com/api/v2/addresses`;

// TYPES DEFINED :

type QuotesData = {
  symbol: string;
  current_price: Number;
  image: string;
};

type TokensData = {
  name: string;
  symbol: string;
  decimals: string;
};

type TokensReturn = {
  token: TokensData;
  value: BigNumberish;
};

// HELPER FUNCTIONS

const getNativeBalance = async (address: string) => {
  const provider = new ethers.JsonRpcProvider(ALCHEMY_URL);
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.formatEther(balance);
  return balanceInEth;
};

const getNonNativeDetails = async (address: string) => {
  const { data } = await axios.get(`${BS_URL}/${address}/token-balances`, {
    headers: {
      accept: "application/json",
    },
  });

  return data;
};

const getTokenDetails = async () => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1`,
  );

  const formattedData: QuotesData[] = data.map((data: QuotesData) => ({
    symbol: data.symbol,
    current_price: data.current_price,
    image: data.image,
  }));

  return formattedData;
};

// API RETURN

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  try {
    const nonNativeData = await getNonNativeDetails(address);
    const token_details = await getTokenDetails();

    const formattedData = nonNativeData.map(
      ({ token, value }: TokensReturn) => {
        const matched_token: QuotesData | undefined = token_details.find(
          (coin) => coin.symbol === token.symbol.toLowerCase(),
        );

        const value_in_usd =
          Number(ethers.formatUnits(value, Number(token.decimals))) *
          Number(matched_token?.current_price);

        console.log(value_in_usd.toFixed(3));

        return {
          name: token.name,
          symbol: token.symbol,
          value_in_eth: Number(
            ethers.formatUnits(value, Number(token.decimals)),
          ).toFixed(5),
          price: matched_token?.current_price,
          image: matched_token?.image,
          value_in_usd: Number(value_in_usd.toFixed(4)),
        };
      },
    );

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
