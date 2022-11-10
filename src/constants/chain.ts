import { Chain } from "wagmi";

export const auroraTestnet = {
  id: 1313161555,
  name: "Aurora Testnet",
  network: "aurora-testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: "https://testnet.aurora.dev/",
  },
  blockExplorers: {
    default: {
      name: "aurorascan",
      url: "https://testnet.aurorascan.dev",
    },
  },
  iconUrl: "/aurora-fav.ico",
  testnet: true,
};

export const auroraChains: Chain[] = [auroraTestnet];
