import { Alchemy, Network } from "alchemy-sdk";

const networks: Record<string, Network> = {
  mainnet: Network.ETH_MAINNET,
  sepolia: Network.ETH_SEPOLIA,
};

export function getAlchemyInstance(network = "mainnet") {
  const settings = {
    apiKey: "B0khUGW2j7DJHPzl2YKhtykOI1yrEsXS",
    network: networks[network],
    fetchOptions: {
      referrerPolicy: "no-referrer", // or "strict-origin-when-cross-origin"
    },
  };

  return new Alchemy(settings);
}
