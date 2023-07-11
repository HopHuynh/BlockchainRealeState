import React, { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import UseGetGovernment from "../../hooks/GetGovernment";
import { useNavigate } from "react-router-dom";
import ReadData from "../../hooks/GetPropertyData";
import IndvAddressData from "./IndvAddressData";
import "./Government.css";
import IndvRunAction from "./IndvRunAction";

const Government = () => {
  const navigate = useNavigate();
  const { data } = useSigner();
  const { GetGovernment } = UseGetGovernment();
  const [dataa, setData] = useState([]);
  const { dataFetching, count, datas } = ReadData();
  const [Loading, setLoading] = useState(false);
  const [lengthOfUnFinished, setLengthOfUnfinished] = useState();

  const CheckGovernment = async () => {
    if (!data._address) return;

    const res = await GetGovernment();
    if (data._address !== res) return navigate("/");
  };

  const getData = async () => {
    setLoading(() => true);
    const res = await dataFetching();
    setData(res);
    setLoading(() => false);
    console.log("FinalData", res);
  };

  useEffect(() => {
    getData();
    CheckGovernment();
  }, [data]);
  console.log("datas", datas);
  if (Loading) return <div> ...Loading ... </div>;
  if (count === 0 && datas.length === 0) {
    return <div>..No Pending Request ...</div>;
  }
  return (
    <div className="DataContainer">
      {/* {dataa.map((items, index) => {
        return <IndvAddressData getData={getData} items={items} />;
      })} */}
      {datas.map((items, index) => {
        return <IndvRunAction getData={getData} items={items} />;
      })}
    </div>
  );
};
export default Government;
