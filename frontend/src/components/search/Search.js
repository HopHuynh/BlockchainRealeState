import React from "react";
import "./Search.css";
// import "./Base.css";
import { parsePath, useNavigate } from "react-router-dom";
import bds1 from "../../img/bds1.jpeg";
import { Link } from "react-router-dom";
import ModalFilter from "../modalfilter.js/ModalFilter";

import {
  BiHelpCircle,
  BiDownload,
  BiShoppingBag,
  BiBell,
  BiSearch,
} from "react-icons/bi";
import { MdOutlineEventNote } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { BsChatDots, BsImages, BsCameraVideo } from "react-icons/bs";
import { AiOutlineCaretDown, AiFillCaretDown } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { CiFilter } from "react-icons/ci";
import { GiPositionMarker } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { updatepost } from "../../redux/userSlice/postSlice";
const Search = () => {
  const listposts = useSelector((state) => state?.listPosts?.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("listpostssearch", listposts);
  const handlechange = (e) => {
    // e.preventDefault();

    dispatch(updatepost(e));
    navigate("product");
  };
  return (
    <div>
      <div className="body">
        <div className="nav-search">
          <div className="nav-search-choose">
            <div className="choose-filter">
              <CiFilter className="icon-filter"></CiFilter>
              <span className="">Lọc</span>
            </div>
            <div className="choose-position">
              <GiPositionMarker className="icon-filter"></GiPositionMarker>
              <select name="lang" className="option-position">
                <option value="TQ">Toàn quốc</option>
                <option value="BDS">Hồ Chí Minh</option>
                <option value="HN">Hà Nội</option>
                <option value="DN">Đà Nẵng</option>
                <option value="HP">Hải Phòng</option>
                <option value="DN">Đồng Nai</option>
              </select>
            </div>
            <div className="choose-category">
              <select name="lang" className="option-category">
                <option value="">Loại hình BDS</option>
                <option value="BDS">Nhà riêng</option>
                <option value="CC">Chung cư</option>
                <option value="BT">Biệt thự</option>
                <option value="SH">Shophouse</option>
                <option value="DN">Đất nền</option>
              </select>
            </div>
            <div className="choose-price">
              <select name="lang" className="option-price">
                <option value="">Mức giá</option>
                <option value="BDS">Dưới 500 triệu</option>
                <option value="Text">500 triệu - 1 tỷ</option>
                <option value="Text">1 tỷ - 3 tỷ</option>
                <option value="Text">3 tỷ - 5 tỷ</option>
                <option value="Text">Trên 5 tỷ</option>
              </select>
            </div>
          </div>
        </div>

        <div className="list-search">
          <Link to={"../homepage"}>
            <a href="#" className="home">
              Home
            </a>
          </Link>

          <div className="list-items">
            {listposts.map((post) => (
              <div
                className="search-item"
                value={post?._id}
                onClick={() => handlechange(post)}
              >
                <img className="img-item" src={post?.img_url[0]} alt="" />

                <div className="info-item">
                  <div className="title-info-item">{post?.name}</div>
                  <div className="descrip-info-item">{post?.content}</div>

                  <div className="price-info-item">{post?.price}</div>
                </div>
              </div>
            ))}
            {/* <div className="item">
              <img className="img-item" src={bds1} alt="" />

              <div className="info-item">
                <div className="title-info-item">Đất mặt tiền 100m2</div>
                <div className="descrip-info-item">
                  Thửa đất có giấy tờ thỏa thuận hoặc văn bản xác định ranh giới
                </div>

                <div className="price-info-item">1.100.000 đ</div>
              </div>
            </div>
            <div className="item">
              <img className="img-item" src={bds1} alt="" />

              <div className="info-item">
                <div className="title-info-item">Đất mặt tiền 100m2</div>
                <div className="descrip-info-item">
                  Thửa đất có giấy tờ thỏa thuận hoặc văn bản xác định ranh giới
                </div>

                <div className="price-info-item">1.100.000 đ</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* Modal lọc danh sách tìm kiếm */}
      {/* <ModalFilter></ModalFilter> */}
    </div>
  );
};

export default Search;
