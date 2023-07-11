import ContractInstance from "../ContractInstances/ContractInstance";

const UseGetGovernment = () => {
  const { contractInstance } = ContractInstance();

  const GetGovernment = async () => {
    const res = await contractInstance.government();
    return res;
  };

  return { GetGovernment };
};
export default UseGetGovernment;
