import ContractInstance from "../ContractInstances/ContractInstance";
import EtherToWei from "../Utils/ConvertEtherToWei";

import { useSigner } from "wagmi";

const UseNotifyTheowner = () => {
  const { contractInstance } = ContractInstance();
  const { data } = useSigner();

  const notifyTheOwner = async (index, actualprice, intendedPrice) => {
    console.log("Called");
    const EtherPrice = EtherToWei(actualprice.toString());
    const IntendedPrice = EtherToWei(intendedPrice.toString());
    console.log("IntendedPrice", IntendedPrice);
    try {
      const res = await contractInstance
        .connect(data)
        .NotifyTheowner(index, EtherPrice, {
          value: IntendedPrice,
        });
      await res.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return { notifyTheOwner };
};
export default UseNotifyTheowner;
