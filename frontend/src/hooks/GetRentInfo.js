import ContractInstance from "../ContractInstances/ContractInstance";

const UseGetRentInfo = () => {
  const { contractInstance } = ContractInstance();

  const GetRentInfo = async (id) => {
    const res = await contractInstance.rentinfos(id);
    return res;
  };

  return { GetRentInfo };
};
export default UseGetRentInfo;
