import { Networks } from "./blockchain";

export const GOERLI_TESTNET = {
  MAIN_ADDRESS: "0x5f2119eF654588994795e47C616f15C9247d71df", //Main Contract
  Newtron_ADDRESS: "0xB64b19640d3CBEacFb4E8CD65EC075f068095da9", //Newtron Contract
  Proton_ADDRESS: "0x0f797c773C70588A42B8C27689b26A67e38EB9E4", //Proton Contract
};

export const getAddresses = (networkID: number) => {
  if (networkID === Networks.GOERLI) return GOERLI_TESTNET;

  throw Error("Network don't support");
};
