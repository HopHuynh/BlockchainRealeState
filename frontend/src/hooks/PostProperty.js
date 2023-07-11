import ContractInstance from "../ContractInstances/ContractInstance";
import EtherToWei from "../Utils/ConvertEtherToWei";

import { useSigner } from "wagmi";

const UsePostProperty = () => {
  const { contractInstance } = ContractInstance();
  const { data } = useSigner();

  const PostProperty = async (uri, price) => {
    console.log("Called");
    const EtherPrice = EtherToWei(price.toString());
    try {
      const res = await contractInstance
        .connect(data)
        .postProperty(uri, EtherPrice);
      await res.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return { PostProperty };
};
export default UsePostProperty;
