import { Networks } from "./blockchain";

export const GOERLI_TESTNET = {
  MAIN_ADDRESS: "0x71F9d5208Bb574d14A7321Ab03660AC310c38F2B", //Main Contract
  Newtron_ADDRESS: "0x3d5aD1E019EE33034FB6b160cd4f7C4521Dc254F", //Newtron Contract
  Proton_ADDRESS: "0x0f797c773C70588A42B8C27689b26A67e38EB9E4", //Proton Contract
};

export const getAddresses = (networkID: number) => {
  if (networkID === Networks.GOERLI) return GOERLI_TESTNET;

  throw Error("Network don't support");
};
