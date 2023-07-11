import ContractInstance from "../ContractInstances/ContractInstance";
import { useSigner } from "wagmi";
const UseWithdrawReward = () => {
  const { contractInstance } = ContractInstance();
  const { data } = useSigner();
  const WithdrawReward = async (index) => {
    const res = await contractInstance.connect(data).withdrawReward(index);
    await res.wait();
  };

  return { WithdrawReward };
};
export default UseWithdrawReward;
