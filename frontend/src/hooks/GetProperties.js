import ContractInstance from "../ContractInstances/ContractInstance";

const UseGetIndvProperty = () => {
  const { contractInstance } = ContractInstance();

  const GetIndvProperty = async (id) => {
    const res = await contractInstance.properties(id);
    return res;
  };

  return { GetIndvProperty };
};
export default UseGetIndvProperty;
