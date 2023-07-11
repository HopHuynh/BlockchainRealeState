import { BigNumber, ethers } from "ethers";

const convertWeiToEther = (n) => ethers.utils.formatEther(n);

export default convertWeiToEther;
