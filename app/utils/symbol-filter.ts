import { getRuntimeConfigArray } from "./runtime-config";
import type { API } from "@orderly.network/types";
import type { ConfigProviderProps } from "@orderly.network/hooks";

/**
 * Create a dataAdapter with symbolList function for filtering symbols
 * based on runtime configuration.
 *
 * Format: Comma-separated list of full symbol names (e.g., "PERP_BTC_USDC,PERP_ETH_USDC")
 * - If VITE_SYMBOL_LIST is specified, only those symbols will be included
 * - Otherwise, shows ALL available perpetual pairs (since Solana wallet can trade any perp)
 *
 * Note: This is a Solana-only DEX in terms of WALLET support, not perpetual contracts.
 * Users with Solana wallets can trade all available perpetuals (BTC, ETH, SOL, etc.)
 */
export function createSymbolDataAdapter(): NonNullable<
  ConfigProviderProps["dataAdapter"]
> {
  const symbolList = getRuntimeConfigArray("VITE_SYMBOL_LIST");

  return {
    symbolList: (original: API.MarketInfoExt[]) => {
      // If custom symbol list is provided, use it
      if (symbolList.length > 0) {
        const symbolSet = new Set(symbolList);
        return original.filter((item) => symbolSet.has(item.symbol));
      }

      // Otherwise, show all available perpetual pairs
      // Users can trade any perpetual using their Solana wallet
      return original;
    },
  };
}
