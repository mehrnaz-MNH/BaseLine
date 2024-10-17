// // context/index.tsx
// "use client";

// import type { ReactNode } from "react";
// import type { Config } from "wagmi";
// import React from "react";
// import { projectId, wagmiAdapter } from "@/config";
// import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import {
//   arbitrum,
//   avalanche,
//   base,
//   mainnet,
//   optimism,
//   polygon,
//   sepolia,
// } from "@reown/appkit/networks";
// import { createAppKit } from "@reown/appkit/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { cookieToInitialState, WagmiProvider } from "wagmi";

// // Set up queryClient
// const queryClient = new QueryClient();

// if (!projectId) {
//   throw new Error("Project ID is not defined");
// }

// // Set up metadata
// const metadata = {
//   name: "baseline",
//   description: "AppKit Example",
//   url: "https://reown.com/appkit", // origin must match your domain & subdomain
//   icons: ["https://assets.reown.com/reown-profile-pic.png"],
// };

// // Create the modal
// const modal = createAppKit({
//   adapters: [wagmiAdapter],
//   projectId,
//   networks: [mainnet, arbitrum, avalanche, base, optimism, polygon, sepolia],
//   defaultNetwork: mainnet,
//   metadata: metadata,
//   features: {
//     analytics: true, // Optional - defaults to your Cloud configuration
//   },
// });

// function ContextProvider({
//   children,
//   cookies,
// }: {
//   children: ReactNode;
//   cookies: string | null;
// }) {
//   const initialState = cookieToInitialState(
//     wagmiAdapter.wagmiConfig as Config,
//     cookies,
//   );

//   return (
//     <WagmiProvider
//       config={wagmiAdapter.wagmiConfig as Config}
//       initialState={initialState}
//     >
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider>{children}</RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

// export default ContextProvider;
