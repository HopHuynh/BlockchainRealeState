import ContractInstance from "../ContractInstances/ContractInstance";

const UseGetCount = () => {
  const { contractInstance } = ContractInstance();

  const GetCount = async () => {
    const res = await contractInstance.counts();
    return res;
  };

  return { GetCount };
};
export default UseGetCount;
