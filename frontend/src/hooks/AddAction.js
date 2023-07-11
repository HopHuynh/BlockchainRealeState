import ContractInstance from "../ContractInstances/ContractInstance";
import { useSigner } from "wagmi";
import EtherToWei from "../Utils/ConvertEtherToWei";
const UseAddAction = () => {
  const { contractInstance } = ContractInstance();
  const { data } = useSigner();
  const AddAction = async (_type, _index, amount, duration) => {
    const _amount =
      _type === 3
        ? EtherToWei(Number(amount).toString())
        : EtherToWei(amount.toString());
    let ethAmount;
    ethAmount = _type === 1 ? 0 : _amount;
    // AddAction(1, post.content.index, 0, Number(activityInfo.duration));
    try {
      const res = await contractInstance
        .connect(data)
        .addAction(_type, _amount.toString(), _index, duration, {
          value: ethAmount.toString(),
        });
      await res.wait();
      return true;
    } catch (error) {
      alert("Something Went Wrong");
      console.log(error);
      return false;
    }
  };

  return { AddAction };
};
export default UseAddAction;
