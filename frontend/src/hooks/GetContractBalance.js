import { useBalance } from 'wagmi'
import { contractAddress } from '../ContractInstances/ContractInstance'
 
function Balance() {
  const { data } = useBalance({
    address: contractAddress,
  })

  return (
    data
  )
}

export default Balance