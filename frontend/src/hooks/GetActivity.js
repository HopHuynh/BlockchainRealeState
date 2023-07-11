import ContractInstance from "../ContractInstances/ContractInstance";

const UseGetActivities = () => {
  const { contractInstance } = ContractInstance();

  const GetActivities = async (id) => {
    const res = await contractInstance.activities(id);
    return res;
  };

  return { GetActivities };
};
export default UseGetActivities;
