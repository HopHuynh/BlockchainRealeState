import ContractInstance from "../ContractInstances/ContractInstance";

const UseRentOrNot = () => {
  const { contractInstance } = ContractInstance();

  const RentOrNot = async (index, content) => {
    try {
      const res = await contractInstance.inRentList(index);
      return res;
    } catch (error) {
      console.log(content, index, error);
    }
  };

  return { RentOrNot };
};
export default UseRentOrNot;
