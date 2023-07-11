import React, { useContext, useEffect, useState } from "react";
import "../product/prduct.css";
import sellerimg from "../../img/seller-img.png";
import {
  BsFillCreditCard2BackFill,
  BsFillTelephoneFill,
  BsHeadset,
} from "react-icons/bs";
import { FiAlertTriangle, FiMap } from "react-icons/fi";
import { TbArrowsMoveHorizontal, TbArrowsMoveVertical } from "react-icons/tb";
import { AiFillCompass, AiOutlineAreaChart } from "react-icons/ai";
import { GiNewspaper } from "react-icons/gi";
import {
  MdChair,
  MdBedroomParent,
  MdOutlineMapsHomeWork,
} from "react-icons/md";

import { TiMessages } from "react-icons/ti";
import { FaToilet, FaEquals } from "react-icons/fa";

import authHeader from "../../services/auth.header";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import baseApi from "../../Utils/Axios";
import { _baseUrl } from "../../Utils/Axios";
import convertWeiToEther from "../../Utils/ConvertWeiToEther";
import UseAddAction from "../../hooks/AddAction";
import { useAccount, useSigner } from "wagmi";
import UseGetGovernment from "../../hooks/GetGovernment";
import UseRunAction from "../../hooks/RunAction";
import UseDeleteAction from "../../hooks/DeleteAction";
import Buttons from "./Buttons";
import Loader from "../Loader/Loader";
import Approve from "./Approve";
import UseGetOwner from "../../hooks/GetOwner";
import UseNotifyTheowner from "../../hooks/NotiyOwner";
import { useParams, useSearchParams } from "react-router-dom";
import EtherToWei from "../../Utils/ConvertEtherToWei";
import { indexApi } from "../ContextApi/IdContextApi";
import UseRentOrNot from "../../hooks/RentOrNot";
import ContractRead from "../../hooks/GetBalance";
import UseRentProperty from "../../hooks/RentProperty";
import UseGetIndvProperty from "../../hooks/GetProperties";
import UseGetRentInfo from "../../hooks/GetRentInfo";
import UseWithdrawReward from "../../hooks/WithdrawReward";
import axios from "axios";
import { createBox } from "../../redux/userSlice/chatBoxSlice";
import { useDispatch, useSelector } from "react-redux";
const Product = () => {
  const user = useSelector((state) => state?.auth?.user);
  const idPost = useSelector((state) => state.post?.post?._id);
  const { address } = useAccount();
  const navigate = useNavigate();
  console.log("idPost", idPost);
  // const id = "645d5226222485d9ca8956a0";
  // const { id } = useContext(indexApi);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [id, setID] = useState();
  const [postUser, setPostUser] = useState("");
  console.log("params", params);
  const [dataRoomChat, setDataRoomChat] = useState({
    senderId: user?.id,
    reciverId: null,
  });
  const { getBalance } = ContractRead();
  const { GetGovernment } = UseGetGovernment();
  const [government, setGovernment] = useState("");
  const fecthGovernment = async () => {
    const _government = await GetGovernment();
    setGovernment(_government);
  };
  const { data } = useSigner();
  const [photo, setPhoto] = useState("");
  const { GetOwner } = UseGetOwner();
  const { notifyTheOwner } = UseNotifyTheowner();
  const [post, setPost] = useState({});
  const { AddAction } = UseAddAction();
  const [owner, setOwner] = useState("");
  const [rentInfo, setRentInfo] = useState({});
  const [percent, setPercent] = useState(0);
  const [price, setPrice] = useState(0);
  const [requestPrice, setRequestPrice] = useState(0);
  const [duration, setDuration] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [indvAmount, setIndvAmount] = React.useState("");
  const { RentOrNot } = UseRentOrNot();
  const { RentProperty } = UseRentProperty();
  const { GetIndvProperty } = UseGetIndvProperty();
  const { GetRentInfo } = UseGetRentInfo();
  const { WithdrawReward } = UseWithdrawReward();

  const rentProperty = async () => {
    try {
      const res = await RentProperty(post?.content?.index);
      alert("Successfull");
    } catch (error) {
      alert("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getPost_User();
  }, []);
  const getPost_User = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/post${idPost}`);
      setPostUser(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getReward = async () => {
    setLoading(() => true);
    try {
      const res = await WithdrawReward(post?.content?.index);
      console.log("Debug  => withdrew", res);
      setLoading(() => false);
    } catch (error) {
      setLoading(() => false);
      alert("Unsuccessfull");
    }
  };

  const RentInfo = async () => {
    const res = await GetRentInfo(post.content.index);
    console.log("RentInfo", res);
    setRentInfo(() => res);
  };

  const handlePercentChange = (e) => {
    setPercent(parseFloat(e.target.value));
  };
  const handlePriceChange = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const buyTheProperty = async () => {
    if (!finalPrice) return alert("Price is zero");
    setLoading(() => true);

    try {
      if (finalPrice > requestPrice && requestPrice) {
        alert("Your request will be forwarded to the owner");
        const res = await notifyTheOwner(
          post.content.index,
          finalPrice,
          requestPrice
        );
        setLoading(() => false);
        if (res) {
          setLoading(() => false);
          alert("Successfull");
        }
      } else {
        const res = await AddAction(0, post.content.index, finalPrice, 0);
        setLoading(() => false);
        if (res) {
          try {
            console.log("Debug ====> user", user);
            console.log("Debug ====> post", post?.content);
            const res = await axios.post(`http://localhost:5000/notif`, {
              userId: user?.id,
              username: user?.username,
              userWallet: address,
              postId: post?.content?._id,
              type: "BUY",
              to: "government",
              detail: `${address.slice(0, 7)}...${address.slice(
                -4
              )} want to buy ${
                post?.content?.name
              } property with ${requestPrice}`,
            });
            navigate(`/authenticationdoc?id=${post?.content?._id}`);
          } catch (err) {
            console.log(err);
          }
          setLoading(() => false);
          alert("Successfull");
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(() => false);
      alert("Something Went Wrong");
    }
  };

  const calculateFinalPrice = () => {
    const discount = (percent / 100) * price;

    const finalPrice = discount;

    setFinalPrice(() => finalPrice);
  };

  const fetchOwner = async () => {
    const _owner = await GetOwner();
    setOwner(_owner);
  };

  const getPropertyDetails = async () => {
    if (!post.content) return;
    const res = await GetIndvProperty(post.content.index);
    setData(res);
    RentInfo();
  };

  useEffect(() => {
    getPropertyDetails();
  }, [post]);

  useEffect(() => {
    var _id = params.get("id");
    setID(_id);
  }, [params]);

  const [isListed, SetIsListed] = useState(false);

  const isRentListed = async (index) => {
    const res = await RentOrNot(index);
    SetIsListed(() => res);
  };

  const RentIt = async () => {
    const price = convertWeiToEther(dataa.rent_price) * duration;
    const formattedNumber = price.toFixed(7);
    alert(`You will pay ${formattedNumber} ETH`);
    setLoading(() => true);

    try {
      const res = await AddAction(
        3,
        post.content.index,
        formattedNumber,
        Number(duration) * 30
      );
      setLoading(() => false);
    } catch (error) {
      console.log(error);
      setLoading(() => false);
    }
  };
  const [dataa, setData] = useState({});
  useEffect(() => {
    fecthGovernment();
    fetchOwner();

    baseApi
      .get(`/post${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        const detailPost = res.data;
        isRentListed(detailPost.content.index);

        setPost(detailPost);

        setPhoto(`${_baseUrl}/img/${detailPost?.content?.img_url[0]}`);

        setPrice(() => convertWeiToEther(detailPost?.content.price));
      })
      .catch((error) => console.log(error));
  }, [data, id]);

  const fecthAmount = async () => {
    if (!post?.content || !data?._address) return;
    const amount = await getBalance(post.content.index, data._address);
    setIndvAmount(() => amount);
  };

  useEffect(() => {
    fecthAmount();
  }, [post, data]);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Ending Rent", Number(rentInfo.rent_ended));
      const remainingTime = Number(rentInfo.rent_ended) - currentTimestamp;
      setTimeLeft(remainingTime > 0 ? remainingTime : 0);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [rentInfo.rent_ended, currentTimestamp]);

  const formatTimeLeft = () => {
    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;
    return `${days} days ${hours}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const onClickRoomChat = async (id) => {
    const newdataRoomChat = { ...dataRoomChat, reciverId: id };
    console.log("newdataRoomChat", id);
    dispatch(createBox(newdataRoomChat));
    const resroomChat = await axios.post(
      "http://localhost:5000/user/conversation",
      newdataRoomChat
    );
  };

  return (
    <div className="product mt-4">
      {loading ? <Loader /> : ""}
      <div className="product_infor">
        <div className="image">
          <div className="product-upload-img">
            <img className="image-product" src={photo}></img>

            <div className="product-upload-mini-img">
              {post?.content?.img_url?.map((img) => (
                <div className="size-img">
                  <img
                    className="image-product-mini"
                    src={`${_baseUrl}/img/${img}`}
                    alt=""
                    onClick={() => setPhoto(`${_baseUrl}/img/${img}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="product_features">
            <h2>{post?.content?.name} </h2>
            <div className="product-address">
              <span>
                Địa chỉ:
                <span>{post?.content?.address}</span>
              </span>
            </div>
            <br />
            <div className="w-full ml-2.5 flex items-center">
              <div className="product-price">
                <span>
                  Giá:
                  <span>
                    {post?.content?.price &&
                      convertWeiToEther(post?.content?.price)}
                  </span>
                  tỷ
                </span>
              </div>
              <div className="product-area ml-10">
                <span>
                  Diện tích:
                  <span>{post?.content?.area}</span>
                  m²
                </span>
              </div>
            </div>
          </div>
          <div className="product_details">
            <h2>Đặc điểm BĐS</h2>
            <div className="product-details-mini">
              <div className="details">
                <FiMap className="icon"></FiMap>
                <span>
                  Diện tích BĐS:
                  <span className="details-area detail-data">
                    {post?.content?.area}
                  </span>
                  m²
                </span>
              </div>

              <div className="details">
                <MdOutlineMapsHomeWork className="icon"></MdOutlineMapsHomeWork>
                <span>
                  Số tầng:
                  <span className="detail-number-of-floors detail-data">
                    {post?.content?.floor}
                  </span>
                  Tầng
                </span>
              </div>

              <div className="details">
                <AiFillCompass className="icon"></AiFillCompass>
                <span>
                  Hường nhà:
                  <span className="detail-direction detail-data">
                    {post?.content?.direction}
                  </span>
                </span>
              </div>

              <div className="details">
                <TbArrowsMoveVertical className="icon"></TbArrowsMoveVertical>
                <span>
                  Chiều dài:
                  <span className="detail-length-house detail-data">
                    {post?.content?.length}
                  </span>
                  m
                </span>
              </div>

              <div className="details">
                <TbArrowsMoveHorizontal className="icon"></TbArrowsMoveHorizontal>
                <span>
                  Chiều rộng:
                  <span className="detail-wide-house detail-data">
                    {post?.content?.wide}
                  </span>
                  m
                </span>
              </div>
            </div>

            <div className="product-details-mini">
              <div className="details">
                <MdBedroomParent className="icon"></MdBedroomParent>
                <span>
                  Số phòng ngủ:
                  <span className="detail-number-of-bedroom detail-data">
                    {post?.content?.bedroom}
                  </span>
                  Phòng
                </span>
              </div>

              <div className="details">
                <FaToilet className="icon"></FaToilet>
                <span>
                  Số phòng toilet:
                  <span className="detail-number-of-toilet detail-data">
                    {post?.content?.bathroom}
                  </span>
                  Phòng
                </span>
              </div>

              <div className="details">
                <GiNewspaper className="icon"></GiNewspaper>
                <span>
                  Tình trạng pháp lí:
                  <span className="detail-juridical detail-data">
                    {post?.content?.juridical}
                  </span>
                </span>
              </div>

              <div className="details">
                <MdChair className="icon"></MdChair>
                <span>
                  Trạng thái nội thất:
                  <span className="detail-interior detail-data">
                    {post?.content?.interior}
                  </span>
                </span>
              </div>

              <div className="details">
                <AiOutlineAreaChart className="icon"></AiOutlineAreaChart>
                <span>
                  Diện tích sử dụng:
                  <span>{post?.content?.usablearea}</span>
                  m²
                </span>
              </div>
            </div>
          </div>
          <div className="product-content">
            <div className="content-product">
              <h2>Mô tả chi tiết:</h2>

              <span className="product-title">{post?.content?.content}</span>
            </div>
            <div className="details">
              <BsFillTelephoneFill className="icon"></BsFillTelephoneFill>
              <span>
                Liên hệ:{post?.content?.user?.phonenumber}
                <span className="product-phonenumber"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="seller_infor">
        <div>
          <img className="seller-img" src={sellerimg}></img>
          <span>
            {/* Được đăng bởi: <br /> */}
            <span className="seller-name">
              {post?.content?.user?.name || user.name}
            </span>
          </span>
          <br />
          <span className="seller-title">Chính chủ/ Môi giới</span>
        </div>

        <div className="seller-contact">
          {/* <h2>Liên hệ với người bán</h2> */}
          <div className="seller-telephone">
            <div className="details">
              <BsFillTelephoneFill className="icon"></BsFillTelephoneFill>
              <span>
                Phonenumber
                <span className="seller-phonenumber"></span>
              </span>
            </div>
          </div>
          <div className="seller-chat">
            <div className="details">
              <Link to={"../chatbox"}>
                <TiMessages className="icon"></TiMessages>

                {/* Chat với người bán */}
              </Link>
              <span className="seller-message">Chat with sellers</span>
            </div>
          </div>
          {!isListed && (
            <div className="product-deal">
              <div className="product-price-deal flex items-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  placeholder="
               
                Enter % price 
                "
                  className="box-product-deal"
                  value={percent}
                  onChange={handlePercentChange}
                ></input>
                <span className="mx-4">%</span>
              </div>
              <div>
                <div className="product-price-deal flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    // Nhập % giá tiền
                    placeholder="
              You want to set price for rent
                "
                    className="box-product-deal"
                    value={requestPrice}
                    onChange={(e) => setRequestPrice(e.target.value)}
                  ></input>
                  <span className="mx-4">ETH</span>
                </div>

                <button className="my-3" onClick={calculateFinalPrice}>
                  <FaEquals></FaEquals>
                </button>
              </div>

              <div className="price-want-to-buy">
                {/* Giá muốn mua:  */}
                <span>Want to buy price:</span>
                <span className="font-bold text-[#ff8c00]">
                  {finalPrice} ETH
                </span>
              </div>

              <div className="mt-5">
                <label className="flex justify-between items-center custom-lable">
                  {/* Giá tiền: */}
                  Price:
                  <input
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                    className="custom-input-price"
                  />
                </label>
              </div>
            </div>
          )}
          {isListed ? <b>The property Has Already been listed as Rent</b> : ""}
          <br />
          <b>
            You own{" "}
            {indvAmount && (indvAmount / Number(post.content.price)) * 100}% of
            the property
          </b>
          {data &&
          isListed &&
          data._address === government &&
          !post.content.alreadyApprovedByGovernment ? (
            <div className="button-buynow" onClick={() => rentProperty()}>
              <button className="button-buy">
                <BsFillCreditCard2BackFill className="icon"></BsFillCreditCard2BackFill>
                <span>
                  {/* Mua Ngay  */}
                  Confirm Rent
                </span>
              </button>
            </div>
          ) : (
            ""
          )}
          {isListed && Number(rentInfo.rent_ended) > 0 && (
            <div className="button-buynow" onClick={() => getReward()}>
              <button className="button-buy">
                <BsFillCreditCard2BackFill className="icon"></BsFillCreditCard2BackFill>
                <span>
                  {/* Mua Ngay  */}
                  GetReward
                </span>
              </button>
            </div>
          )}
          {isListed && Number(rentInfo.rent_ended) < currentTimestamp ? (
            <div>
              <div className="product-price-deal">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  // Nhập % giá tiền
                  placeholder="
Duration you want to rent for in month
                "
                  className="box-product-deal"
                  value={duration}
                  onChange={(e) => setDuration(() => e.target.value)}
                ></input>
              </div>
              <div className="button-buynow" onClick={() => RentIt()}>
                <button className="button-buy">
                  <BsFillCreditCard2BackFill className="icon"></BsFillCreditCard2BackFill>
                  <span>
                    {/* Mua Ngay  */}
                    Rent It
                  </span>
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {!isListed && post ? (
            <Buttons
              finalPrice={finalPrice}
              post={post}
              buyTheProperty={buyTheProperty}
              government={government}
              dataa={dataa}
            />
          ) : (
            ""
          )}
          {!isListed && data && data._address === owner ? (
            <Approve post={post} />
          ) : (
            ""
          )}

          {rentInfo.rent_ended > 0 ? (
            timeLeft > 0 ? (
              <p>Time left to complete: {formatTimeLeft()}</p>
            ) : (
              <p>Finished</p>
            )
          ) : (
            ""
          )}
        </div>
        <div className="help">
          <div className="details support">
            <BsHeadset className="icon"></BsHeadset>
            <span>Cần trợ giúp</span>
          </div>

          <div className="details report">
            <FiAlertTriangle className="icon"></FiAlertTriangle>
            <span>Báo cáo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
