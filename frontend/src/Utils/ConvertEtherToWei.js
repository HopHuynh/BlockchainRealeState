import { ethers } from "ethers";
const EtherToWei = (n) => ethers.utils.parseUnits(n, "ether");
export default EtherToWei;
