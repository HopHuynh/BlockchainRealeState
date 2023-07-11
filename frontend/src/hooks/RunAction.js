import ContractInstance from "../ContractInstances/ContractInstance";
import { useSigner } from "wagmi";
const UseRunAction = () => {
  const { contractInstance } = ContractInstance();
  const { data } = useSigner();
  const RunAction = async (index) => {
    try {
      console.log(index);
      const res = await contractInstance.connect(data).runAction(index);
      await res.wait();
    } catch (error) {
      alert("Something Went Wrong");
      console.log(error);
    }
  };

  return { RunAction };
};
export default UseRunAction;
