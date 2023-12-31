import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import Config from "./../../config/app";

const RPC_URL = Config.rpcURL;
export const injected = new InjectedConnector({
  supportedChainIds: [Config.netId],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { [Config.netId]: RPC_URL },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  chainId: Config.netId,
});
