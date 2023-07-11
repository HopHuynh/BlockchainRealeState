import ContractInstance from "../ContractInstances/ContractInstance";
import EtherToWei from "../Utils/ConvertEtherToWei";

import { useSigner } from "wagmi";

const UseSettleTheContract = () => {
  const { contractInstance } = ContractInstance();
  const { data } = useSigner();

  const settleContract = async (index, _addr, approve) => {
    console.log("address", _addr);
    console.log("index", index);
    console.log("approve", approve);
    try {
      const res = await contractInstance
        .connect(data)
        .SettleTheContract(index, _addr, approve, {
          gasLimit: 300000,
        });
      await res.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return { settleContract };
};
export default UseSettleTheContract;
