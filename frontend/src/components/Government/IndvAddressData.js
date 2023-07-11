import React, { useState } from "react";
import convertWeiToEther from "../../Utils/ConvertWeiToEther";
import UseGetAddress from "../../hooks/GetIntendedAddress";
import UseAddressData from "../../hooks/GetActualAddressData";
import { useSigner } from "wagmi";
import UseSettleTheContract from "../../hooks/SettleContract";
import Loader from "../Loader/Loader";

const IndvAddressData = ({ items, getData }) => {
  const { GetGovernment } = UseGetAddress();
  const [arrayData, setArrayData] = useState([]);
  const { getAddressData } = UseAddressData();
  const { data } = useSigner();
  const { settleContract } = UseSettleTheContract();
  const [loading, setLoading] = useState();
  const ApproveOrNot = async (address, bool) => {
    setLoading(() => true);
    try {
      const res = await settleContract(items.index, address, bool);
      setLoading(() => false);
      getData();
      if (res) {
        getData();
        alert("SccesssFull");
        setLoading(() => false);
      }
    } catch (error) {
      alert("Something Went Wrong");
      setLoading(() => false);
    }
  };
  if (!items) return;
  console.log(items);
  if (!items.res.madeRequest) return;
  return (
    <div className="indvApprove">
      {loading ? <Loader /> : ""}
      <div>
        {" "}
        <b>Property Index:</b> {items.index}
      </div>
      <div>
        <b> From :</b>
        {items.res.Caller.slice(0, 5)}...{items.res.Caller.slice(37, 42)}
      </div>
      <div>
        {" "}
        <b>Requested Amount :</b> {convertWeiToEther(items.res.actualPrice)}
      </div>
      <div>
        <b>Actual Amount :</b> {convertWeiToEther(items.res.intendedPrice)}
      </div>
      <div>
        <div className="buttonsContainer">
          <button
            className="Approve"
            onClick={() => ApproveOrNot(items.res.Caller, true)}
          >
            {" "}
            Approve{" "}
          </button>
          <button
            className="Approve Decline"
            onClick={() => ApproveOrNot(items.res.Caller, false)}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndvAddressData;
