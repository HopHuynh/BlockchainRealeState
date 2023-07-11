import ContractInstance from "../ContractInstances/ContractInstance";

const UseDeleteAction = () => {
  const { contractInstance } = ContractInstance();

  const DeleteAction = async (index) => {
    try {
      const res = await contractInstance.deleteAction(index);
      await res.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return { DeleteAction };
};
export default UseDeleteAction;
