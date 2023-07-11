import { useState } from "react";
import ContractInstance from "../ContractInstances/ContractInstance";
import UseAddressData from "./GetActualAddressData";
import UseGetAddress from "./GetIntendedAddress";
import UseGetIndvProperty from "./GetProperties";
import UseGetRentInfo from "./GetRentInfo";
import UseGetActivities from "./GetActivity";
const ReadData = () => {
  const { contractInstance } = ContractInstance();
  const { GetGovernment } = UseGetAddress();
  const { getAddressData } = UseAddressData();
  const [count, setCount] = useState(0);
  const [datas, setData] = useState([]);
  const { GetIndvProperty } = UseGetIndvProperty();
  const { GetRentInfo } = UseGetRentInfo();
  const { GetActivities } = UseGetActivities();

  const wholeData = async (i, array, array1) => {
    let address = [];
    address = await GetGovernment(i);
    var response = await GetIndvProperty(i);
    if (response.madeAddAction) {
      const res = await GetActivities(Number(response._actCount));

      array1.push({ res, index: i });
    }
    for (let j = 0; j < address.length; j++) {
      console.log(i, address[j]);
      const res = await getAddressData(i, address[j]);
      if (!res.finished) {
        setCount((x) => x + 1);
      }
      if (res.Caller === "0x0000000000000000000000000000000000000000s") {
        continue;
      }
      array.push({ res, index: i });
    }
  };

  const dataFetching = async () => {
    const length = await contractInstance.counts();
    console.log("Counts", Number(length));
    let array = [];
    let array1 = [];

    for (let i = 0; i <= length; i++) {
      setData([]);
      try {
        await wholeData(i, array, array1);
      } catch (err) {
        console.log(err);
        continue;
      }
    }
    setData(() => [...array1]);
    return array;
  };

  return { dataFetching, count, datas };
};
export default ReadData;
