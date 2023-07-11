import ContractInstance from "../ContractInstances/ContractInstance";

const UseAddressData = () => {
  const { contractInstance } = ContractInstance();

  const getAddressData = async (index, address) => {
    const res = await contractInstance.ActualAndIntendedData(index, address);
    return res;
  };

  return { getAddressData };
};
export default UseAddressData;
