import ContractInstance from "../ContractInstances/ContractInstance";
import { useSigner } from "wagmi";
const UseWithdrawAmount = () => {
  const { contractInstance } = ContractInstance();
  const { data } = useSigner();
  const WithdrawAmount = async () => {
      const res = await contractInstance.connect(data).ownerWithdraw();
      await res.wait();

  };

  return { WithdrawAmount };
};
export default UseWithdrawAmount;
