import ContractInstance from "../ContractInstances/ContractInstance";
import { useSigner } from "wagmi";
const UseDeleteAction = () => {
  const { contractInstance } = ContractInstance();
  const { data } = useSigner();
  const DeleteAction = async (index) => {
    try {
      const res = await contractInstance.connect(data).deleteAction(index);
      await res.wait();
    } catch (error) {
      alert("Something Went Wrong");
      console.log(error);
    }
  };

  return { DeleteAction };
};
export default UseDeleteAction;
