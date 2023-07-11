import React, { useEffect, useState } from "react";
import UseGetAddress from "../../hooks/GetIntendedAddress";
import { useSigner } from "wagmi";
import UseAddressData from "../../hooks/GetActualAddressData";
import convertWeiToEther from "../../Utils/ConvertWeiToEther";
import "./Approve.css";
import UseSettleTheContract from "../../hooks/SettleContract";
import Loader from "../Loader/Loader";
const Approve = ({ post }) => {
  const { GetGovernment } = UseGetAddress();
  const [arrayData, setArrayData] = useState([]);
  const { getAddressData } = UseAddressData();
  const { data } = useSigner();
  const { settleContract } = UseSettleTheContract();
  const [loading, setLoading] = useState();

  const ApproveOrNot = async (address, bool) => {
    setLoading(() => true);
    try {
      // Is this the same code being compiled..?
      // From where you used the terminal from cmd...?
      // cmd
      console.log("deeeeeeeeeeeeeee,",address) // address == undifine
      const res = await settleContract(post.content.index, address, bool);

      setLoading(() => false);
      if (res) {
        alert("SccesssFull");
        setLoading(() => false);
        fetchAddress();
      }
    } catch (error) {
      alert("Something Went Wrong");
      setLoading(() => false);
    }
  };

  const fetchAddress = async () => {
    if (!post.content) return;
    const _addresses = await GetGovernment(post.content.index);
    console.log("Addresses", _addresses);
    const array = [];

    for (let i = 0; i < _addresses.length; i++) {
      const res = await getAddressData(post.content.index, _addresses[i]);
      array.push(res);
    }

    setArrayData(array);
  };

  useEffect(() => {
    fetchAddress();
  }, [data, post]);
  console.log("ArrayData" , arrayData)
  // once run it from vs code terminal...

  return (
    <div>
      {loading ? <Loader /> : ""}
      {arrayData.map((items, index) => {
    
        if (!items.madeRequest) return;
        return (
          <div key={index} className="indvApprove">
            <div>Details</div>
            <div>
              From : {items[2].slice(0, 5)}....{items[2].slice(37, 42)}
            </div>
            <div>Actual Price : {convertWeiToEther(items.actualPrice)}</div>
            <div>
              Requested Price : {convertWeiToEther(items.intendedPrice)}
            </div>
            <div className="buttonsContainer">
              <button
                className="Approve"
                onClick={() => ApproveOrNot(items.caller, true)}
              >
                {" "}
                Approve{" "}
              </button>
              <button
                className="Approve Decline"
                onClick={() => ApproveOrNot(items.caller, false)}
              >
                Decline
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Approve;
