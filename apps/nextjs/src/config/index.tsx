// // config/index.tsx

// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
// import { arbitrum, mainnet, sepolia } from "@reown/appkit/networks";
// import { cookieStorage, createStorage, http } from "@wagmi/core";

// // Get projectId from https://cloud.reown.com
// export const projectId = "f2fc7017f2367ac92ade262af6ca2380";

// if (!projectId) {
//   throw new Error("Project ID is not defined");
// }

// export const networks = [mainnet, sepolia];

// //Set up the Wagmi Adapter (Config)
// export const wagmiAdapter = new WagmiAdapter({
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   ssr: true,
//   projectId,
//   networks,
// });

// export const config = wagmiAdapter.wagmiConfig;
