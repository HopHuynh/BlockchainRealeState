import { Fragment, useContext, useEffect } from "react";
import React from "react";
import { TbHomeDollar, TbHomeRibbon } from "react-icons/tb";
import { BsCardImage } from "react-icons/bs";
import { FiMap, FiMapPin } from "react-icons/fi";
import { MdPriceCheck } from "react-icons/md";
import Logo from "../../img/zyro-image.png";
import { Link } from "react-router-dom";
import { parsePath, useNavigate } from "react-router-dom";
import bgimg from "../../img/vinhomes-grand-park-1.jpg";
import vinhome1 from "../../img/vinhome1.jpg";
import vinhome2 from "../../img/vinhome2.jpg";
import vinhome3 from "../../img/vinhome3.png";
import vinhome4 from "../../img/vinhome4.jpg";
import vinhome5 from "../../img/vinhome5.jpg";
import vinhome6 from "../../img/vinhome6.jpg";
import vinhome7 from "../../img/vinhome7.jpg";
import PropertyContext from "../../ContextApi/PropertyContext";

import "../homepage/Home.css";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { updatepost } from "../../redux/userSlice/postSlice";
import IndvProperty from "./IndvProperty";
import SimpleImageSlider from "react-simple-image-slider";
import ContractInstance from "../../ContractInstances/ContractInstance";
import Balance from "../../hooks/GetContractBalance";
import UseWithdrawAmount from "../../hooks/WithrawAmount";
import UseGetOwner from "../../hooks/GetOwner";
import { useSigner } from "wagmi";

const Home = () => {
  //hooks
  // const { dataFetching } = ReadData();
  // const [data, setData] = useState([]);
  const { WithdrawAmount } = UseWithdrawAmount();

  const id = useSelector((state) => state.post?.post?._id);
  const data = Balance();

  const [whichToShow, setWhichToShow] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rentPost, salePost, posts } = useContext(PropertyContext);

  const [active, setActive] = useState(0);
  const { GetOwner } = UseGetOwner();
  const [owner, setOwner] = useState("");
  const signer = useSigner();

  const images = [
    { url: bgimg },
    { url: vinhome1 },
    { url: vinhome2 },
    { url: vinhome3 },
    { url: vinhome4 },
    { url: vinhome5 },
  ];

  const displayWhich = (_data) => {
    setWhichToShow(() => _data);
  };

  const handlechange = (post) => {
    // e.preventDefault();

    dispatch(updatepost(post));
    navigate(`product`);
  };

  const fetchOwner = async () => {
    const res = await GetOwner();
    setOwner(() => res);
  };
  useEffect(() => {
    fetchOwner();
  }, [signer]);

  const WithdrawTheBalance = async () => {
    try {
      const res = await WithdrawAmount();
      alert("Amount Withdrawn Successfully");
    } catch (error) {
      alert("Something Went Wrong");
    }
  };

  return (
    <div className="homepage">
      <div className="grid grid-cols-8 gap-4">
        <div className="col-start-1 col-end-7">
          <SimpleImageSlider
            className="custom-image-slider"
            width={1060}
            height={560}
            images={images}
            showBullets={true}
            showNavs={true}
          ></SimpleImageSlider>
        </div>
        <div className="ml-2 col-span-2">
          <img className="custom-image" alt="" src={vinhome6}></img>
          <img className="custom-image" alt="" src={vinhome7}></img>
        </div>
      </div>
      {signer.data && signer.data._address === owner && (
        <div className="withdrawContainer">
          <div>
            <b>Withdraw Amount : </b> {data?.formatted} {data?.symbol}
          </div>
          <button
            className="withdrawAmount"
            onClick={() => WithdrawTheBalance()}
          >
            Withdraw
          </button>
        </div>
      )}
      <div className="discover">
        <div id="menu-discover">
          <ul>
            <li
              className={`${active === 1 ? "active" : ""} discover-edit`}
              onClick={() => setActive(1)}
            >
              <a onClick={() => displayWhich("SalePost")}>
                <TbHomeDollar className="discover_icon"></TbHomeDollar>
                <span>Buy House</span>
              </a>
            </li>
            <li
              className={`${active === 2 ? "active" : ""} discover-edit`}
              onClick={() => setActive(2)}
            >
              <a onClick={() => displayWhich("RentPost")}>
                <TbHomeRibbon className="discover_icon"></TbHomeRibbon>
                <span>Rent House</span>
              </a>
            </li>
            {/* <div className="line absolute bottom-0 left-0 h-1 rounded-xl w-5 bg-orange-500"></div> */}
          </ul>
        </div>
      </div>
      {/* <div className="sell-bds">
         {posts?.content?.map((post) => (
          <div className=" product-sell" onClick={() => handlechange(post)}>
            <img
              className="img-bds"
              src={`http://localhost:5000/img/${post?.img_url[0]}`}
              alt="#"
            />
            <div className="title-bds">
              <h2>{post?.name} </h2>
            </div>
            <div className="area-bds">
              <span className="span-bds">
                Diện tích:
                <span>{post?.area}</span>
                m²
              </span>
            </div>
            <div className="price-bds">
              <span className="span-bds">
                Giá:
                <span>{post?.price / 10e18}</span>
                tỷ
              </span>
            </div>
            <div className="address-bds">
              <span>
                Địa chỉ:
                <span>{post?.address}</span>
              </span>
            </div>
          </div>
        ))}
      </div>  */}
      <div className="rent-bds w-full">
        <div className="w-full">
          {whichToShow === "" ? (
            <div className="PlzSelect">
              {" "}
              <p>Plz select the property type you want to display here</p>
            </div>
          ) : (
            ""
          )}
          {whichToShow === "RentPost" ? (
            <IndvProperty posts={rentPost} name="Rent" />
          ) : (
            ""
          )}
          {whichToShow === "SalePost" ? (
            <IndvProperty posts={salePost} name="" />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;

{
  /* <a href="/Duan_2023/frontend/src/components/product/product.js">
          <div className=" product-sell">
            <img
              className="img-bds"
              src="https://file4.batdongsan.com.vn/resize/1275x717/2023/04/03/20230403094015-bc3a_wm.jpg"
            ></img>
            <div className="title-bds">
              <h2>Cho thuê nhà mới 100% </h2>
            </div>
            <div className="area-bds">
              <span className="span-bds">Diện tích:52 m² Mặt tiền 10 m </span>
            </div>
            <div className="price-bds">
              <span className="span-bds">Giá:15 triệu/tháng</span>
            </div>
            <div className="address-bds">
              <span>
                Địa chỉ:Đường Tiểu La, Phường Hòa Cường Bắc, Hải Châu, Đà Nẵng
              </span>
            </div>
          </div>
        </a>
 
        <a href="/Duan_2023/frontend/src/components/product/product.js">
          <div className=" product-sell">
            <img
              className="img-bds"
              src="https://file4.batdongsan.com.vn/2023/02/24/20230224200953-8769_wm.jpeg"
            ></img>
            <div className="title-bds">
              <h2>Cho thuê villa nơi đáng sống nhất Đà nẵng </h2>
            </div>
            <div className="area-bds">
              <span className="span-bds">Diện tích:176 m² Mặt tiền 8 m </span>
            </div>
            <div className="price-bds">
              <span className="span-bds">Giá:26 triệu/tháng</span>
            </div>
            <div className="address-bds">
              <span>Địa chỉ:Dream Home, Cẩm Lệ, Đà Nẵng</span>
            </div>
          </div>
        </a>

        <a href="/Duan_2023/frontend/src/components/product/product.js">
          <div className=" product-sell">
            <img
              className="img-bds"
              src="https://file4.batdongsan.com.vn/resize/1275x717/2023/03/20/20230320132404-c15b_wm.jpg"
            ></img>
            <div className="title-bds">
              <h2>
                Cho thuê nhanh nhà đẹp 4 tầng, nội thất đầy đủ, nhà mới vào ở
                ngay{" "}
              </h2>
            </div>
            <div className="area-bds">
              <span className="span-bds">Diện tích:150 m² </span>
            </div>
            <div className="price-bds">
              <span className="span-bds">Giá: 17 triệu/tháng</span>
            </div>
            <div className="address-bds">
              <span>
                Địa chỉ:Đường Mân Quang 10, Phường Thọ Quang, Sơn Trà, Đà Nẵn
              </span> 
            </div>
          </div>
        </a> */
}
