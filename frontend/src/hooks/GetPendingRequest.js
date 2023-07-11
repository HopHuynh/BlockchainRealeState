import ContractInstance from "../ContractInstances/ContractInstance";

const UseGetPending = () => {
  const { contractInstance } = ContractInstance();
  const GetPendingRequest = async () => {
    const res = await contractInstance.getPendingActualAndIntendedData();
    return res;
  };
  return { GetPendingRequest };
};

export default UseGetPending;
