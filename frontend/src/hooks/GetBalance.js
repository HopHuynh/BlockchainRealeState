import ContractInstance from "../ContractInstances/ContractInstance";

const ContractRead = () => {
  const { contractInstance } = ContractInstance();
  const getBalance = async (id, address) => {
    const res = await contractInstance.getBalance(id, address);
    return res;
  };
  return { getBalance };
};

export default ContractRead;
