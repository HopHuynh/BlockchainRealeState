import ContractInstance from "../ContractInstances/ContractInstance";

const UseGetOwner = () => {
  const { contractInstance } = ContractInstance();

  const GetOwner = async () => {
    const res = await contractInstance.owner();
    return res;
  };

  return { GetOwner };
};
export default UseGetOwner;
