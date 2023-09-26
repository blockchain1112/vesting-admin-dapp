import VestingABI from "./VestingABI.json";

export default {
  netId: 80001,
  rpcURL: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
  chainName: "Mumbai Network",
  explorURL: "https://mumbai.polygonscan.com/",
  BoomToken: {
    address: "0xe28a5eEccEa87c34F4aE2D90197d66EE2A87f13A",
    abi: VestingABI,
  },
  VestingContract: {
    address: "0xc8b262de5b552695dDF8304A5237aD90623936b9",
    abi: VestingABI,
  },
};
