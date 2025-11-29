import { ReactNode } from 'react';
import { WalletConnectorProvider } from '@orderly.network/wallet-connector';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import type { NetworkId } from "@orderly.network/types";
import { getSolanaWallets } from '../../utils/walletConfig';

interface WalletConnectorProps {
  children: ReactNode;
  networkId: NetworkId;
}

const WalletConnector = ({ children, networkId }: WalletConnectorProps) => {
  const solanaInitial = {
    network: networkId === 'mainnet' ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet,
    wallets: getSolanaWallets(networkId),
  };

  return (
    <WalletConnectorProvider
      solanaInitial={solanaInitial}
      evmInitial={undefined}
    >
      {children}
    </WalletConnectorProvider>
  );
};

export default WalletConnector;
