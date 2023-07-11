import React, { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import UseGetIndvProperty from "../../hooks/GetProperties";
import UseRunAction from "../../hooks/RunAction";
import UseDeleteAction from "../../hooks/DeleteAction";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import UseAddAction from "../../hooks/AddAction";
import convertWeiToEther from "../../Utils/ConvertWeiToEther";
import UseGetRentInfo from "../../hooks/GetRentInfo";
import UseGetActivities from "../../hooks/GetActivity";
import Loader from "../Loader/Loader";

export const actionObj = {
  0: "BUY",
  1: "ADD_RENT_LIST",
  2: "REMOVE_RENT_LIST",
  3: "RENT",
};

const Buttons = ({ post, buyTheProperty, isListed, government }) => {
  console.log("IsListed Buttons", isListed);

  const { RunAction } = UseRunAction();
  const { DeleteAction } = UseDeleteAction();
  const { AddAction } = UseAddAction();
  const [dataa, setData] = useState({});
  const [rentInfo, setRentInfo] = useState({});
  const [alreadyInRentList, setAlreadyInList] = useState(false);
  const [duration  , setDuration] = useState(0)
  const [activityInfo, setActivityInfo] = useState("");
  const { GetRentInfo } = UseGetRentInfo();
  const { GetIndvProperty } = UseGetIndvProperty();
  const [loading, setLoading] = useState(false);
  const [rentPrice, setRentPrice] = useState("");

  const { GetActivities } = UseGetActivities();

  const fetchPropertyDetailsANdRentinfo = async () => {
    const res = await GetIndvProperty(post.content.index);
    setData(res);
    const _rentInfo = await GetRentInfo(post.content.index);
    setRentInfo(_rentInfo);
    const _activityInfo = await GetActivities(Number(res._actCount));
    setActivityInfo(_activityInfo);
    const _alreadyInRentList = Number(_rentInfo.rent_ended) !== 0;
    setAlreadyInList(() => _alreadyInRentList);
  };
  const { data } = useSigner();

  useEffect(() => {
    if (!post.content) return;
    fetchPropertyDetailsANdRentinfo();
  }, [post, data]);

  const addToRentList = async () => {
    setLoading(() => true);
    try {
      const res = await AddAction(
        1,
        post.content.index,
        rentPrice,
        duration
      );
      setLoading(() => false);
      fetchPropertyDetailsANdRentinfo();
      if (res) {
        alert("Successfull");
        setLoading(() => false);
      }
    } catch (error) {
      console.log(error);
      setLoading(() => false);
      alert("Something Went Wrong");
    }
  };

  const runTheAction = async () => {
    setLoading(() => true);
    try {
      const res = await RunAction(post.content.index);
      fetchPropertyDetailsANdRentinfo();
      setLoading(() => false);
      if (res) {
        alert("Successfully runned Action");
        setLoading(() => false);
      }
    } catch (error) {
      setLoading(() => false);
      console.log(error);
    }
  };

  const deleteTheAction = async () => {
    setLoading(() => true);
    try {
      const res = await DeleteAction(post.content.index);
      fetchPropertyDetailsANdRentinfo();
      setLoading(() => false);
      if (res) {
        alert("Successfully deleted Action");
        setLoading(() => false);
      }
    } catch (error) {
      console.log(error);
      setLoading(() => false);
      alert("Something Went Wrong");
    }
  };
  const AddtoRentList = Number(dataa.leftAmount) === 0;
  const alreadyAdded = dataa.madeAddAction;

  return (
    <div>
      {loading ? <Loader /> : ""}
      {alreadyAdded ? (
        <div>Plz wait until the previous request is accepted</div>
      ) : (
        ""
      )}
      {!alreadyInRentList && (
        <div
          className={alreadyAdded ? " button-buynow disable" : "button-buynow"}
          onClick={() => !alreadyAdded && buyTheProperty()}
        >
          <button className="button-buy">
            <BsFillCreditCard2BackFill className="icon"></BsFillCreditCard2BackFill>
            <span>
              {/* Mua Ngay  */}
              Buy Now
            </span>
          </button>
        </div>
      )}
      {dataa.madeAddAction &&
      data &&
      activityInfo &&
      government === data._address ? (
        <div>
          {Number(activityInfo.from) !==
            "0x0000000000000000000000000000000000000000" && (
            <div>
              <div>
                From : {activityInfo.from.slice(0, 5)}...
                {activityInfo.from.slice(37, 42)}
              </div>
              <div>Amount :{convertWeiToEther(activityInfo.amount)}</div>
              <div>Duration:{Number(activityInfo.duration)}days</div>
              <div>For:{actionObj[Number(activityInfo._type)]}</div>
            </div>
          )}
          <div className="button-buynow" onClick={() => runTheAction()}>
            <button className="button-buy">
              <BsFillCreditCard2BackFill className="icon"></BsFillCreditCard2BackFill>
              <span>
                {/* Mua Ngay  */}
                Run Action
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {data && government === data._address ? (
        <div className="button-buynow" onClick={() => deleteTheAction()}>
          <button className="button-buy">
            <BsFillCreditCard2BackFill className="icon"></BsFillCreditCard2BackFill>
            <span>
              {/* Mua Ngay  */}
              Delete Action
            </span>
          </button>
        </div>
      ) : (
        ""
      )}
      {console.log("Left , total" , dataa.leftAmount , post?.content?.price)}
      LeftAmount:
      {dataa.leftAmount &&
        (Number(dataa.leftAmount) / post?.content?.price) * 100} %
      {data && dataa.maxHolder === data._address ? (
        <div>
          <b>You are the maxHolder of the property;</b>
          <div>
            <div className="product-price-deal">
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                placeholder="Rent Price"
                className="box-product-deal"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
               />
            </div>
          </div>
    
          <div
            className={
              AddtoRentList ? "button-buynow" : "button-buynow disable"
            }
            onClick={() => AddtoRentList && addToRentList()}
          >
            <button className={"button-buy"}>
              <BsFillCreditCard2BackFill className="icon"></BsFillCreditCard2BackFill>
              <span>
                {/* Mua Ngay  */}
                Add To RentList
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Buttons;
