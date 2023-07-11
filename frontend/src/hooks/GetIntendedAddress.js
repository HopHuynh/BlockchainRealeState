import ContractInstance from "../ContractInstances/ContractInstance";

const UseGetAddress = () => {
  const { contractInstance } = ContractInstance();

  const GetGovernment = async (index) => {
    const res = await contractInstance.GetAddress(index);
    return res;
  };

  return { GetGovernment };
};
export default UseGetAddress;
