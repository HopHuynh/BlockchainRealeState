import { useSigner } from "wagmi";
import ContractInstance from "../ContractInstances/ContractInstance";

const UseRentProperty = () => {
  const { contractInstance } = ContractInstance();
  const {data} = useSigner()

  const RentProperty = async (index) => {
    console.log( "Index", index)
    
    const res = await contractInstance.connect(data).rentProperty(index);
      await res.wait();
  };

  return { RentProperty };
};
export default UseRentProperty;
