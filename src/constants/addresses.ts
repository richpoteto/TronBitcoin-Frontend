import { Networks } from "./blockchain";

export const GOERLI_TESTNET = {
  MAIN_ADDRESS: "0x5571Ccd2DB841c7432F6e0EA507607C83A996B97", //Main Contract
  Newtron_ADDRESS: "0x3d5aD1E019EE33034FB6b160cd4f7C4521Dc254F", //Newtron Contract
  Proton_ADDRESS: "0x0f797c773C70588A42B8C27689b26A67e38EB9E4", //Proton Contract
};

export const getAddresses = (networkID: number) => {
  if (networkID === Networks.GOERLI) return GOERLI_TESTNET;

  throw Error("Network don't support");
};
