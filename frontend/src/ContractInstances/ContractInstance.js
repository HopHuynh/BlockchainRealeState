import { useContract } from "wagmi";
import { useProvider } from "wagmi";
import ABI from "../Artifacts/Abi";

export const contractAddress = "0xF8297D2211365E47e93F9b3F57CDbbc7aC918b67";
export default function ContractInstance() {
  const provider = useProvider();

  const contractInstance = useContract({
    address: contractAddress,
    abi: ABI,
    signerOrProvider: provider,
  });

  return {
    contractInstance,
  };
}
