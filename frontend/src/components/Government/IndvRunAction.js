import React, { useState } from "react";
import { actionObj } from "../product/Buttons";
import convertWeiToEther from "../../Utils/ConvertWeiToEther";
import UseRunAction from "../../hooks/RunAction";
import Loader from "../Loader/Loader";
const IndvRunAction = ({ items, getData }) => {
  const { RunAction } = UseRunAction();
  const [loading, setLoading] = useState(false);

  const runTheAction = async () => {
    setLoading(() => true);
    try {
      const res = await RunAction(items.index);
      setLoading(() => false);
      getData();
      if (res) {
        alert("Successfully runned Action");
        getData();
        setLoading(() => false);
      }
    } catch (error) {
      setLoading(() => false);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="indvApprove">
        <div>
          <b> Property Index :</b> {items.index}
        </div>
        <div>
          <b>From : </b>
          {items.res.from.slice(0, 5)}...
          {items.res.from.slice(37, 42)}
        </div>
        <div>
          <b>Amount :</b>
          {convertWeiToEther(items.res.amount)}
        </div>
        <div>
          <b></b>Duration:{Number(items.res.duration)}days
        </div>
        <div>
          <b>For:</b>
          {actionObj[Number(items.res._type)]}
        </div>
        <div>
          <button
            className="Approve"
            style={{ width: "100px" }}
            onClick={() => runTheAction()}
          >
            Run Action
          </button>
        </div>
      </div>
    </>
  );
};

export default IndvRunAction;
