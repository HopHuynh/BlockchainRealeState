import React, { useContext, useEffect, useState } from "react";
import { ChangeEvent } from "react";
import "./Post.css";
import "./Base.css";
import Header from "../../header/header";
import { BsImages, BsCameraVideo } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../redux/userSlice/postSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authHeader from "../../../services/auth.header";
import UsePostProperty from "../../../hooks/PostProperty";
import UseGetCount from "../../../hooks/GetCount";
import EtherToWei from "../../../Utils/ConvertEtherToWei";
import { useAccount, useSigner } from "wagmi";
import UseGetOwner from "../../../hooks/GetOwner";
import Loader from "../../Loader/Loader";
import { indexApi } from "../../ContextApi/IdContextApi";
import imageUpload from "../../../img/uploadImage.svg";
const Post = () => {
  const navigate = useNavigate();
  const { setId } = useContext(indexApi);

  const { isConnected } = useAccount();
  const { GetCount } = UseGetCount();
  const { data } = useSigner();
  const { GetOwner } = UseGetOwner();
  const user = useSelector((state) => state.auth.user);
  const { PostProperty } = UsePostProperty();
  const [Imgs, setImgs] = useState([]);
  const [dataPost, setDataPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    user: user.id,
    price: "",
    area: "",
    length: "",
    wide: "",
    status: "",
    content: "",
    address: "",
    name: "",
    floor: "",
    juridical: "",
    interior: "",
    bedroom: "",
    bathroom: "",
    direction: "",
    usablearea: "",
  });

  const [photo, setPhoto] = useState();
  useEffect(() => {
    return () => {
      photo && URL.revokeObjectURL(photo);
    };
  }, [photo]);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) return alert("Plz connect to the wallet");
    if ((await GetOwner()) !== data._address)
      return alert("You are not the owner");
    console.log(userData.price);
    setLoading(() => true);
    try {
      const count = Number(await GetCount());
      const formData = new FormData();
      for (let i = 0; i < Imgs.length; i++) {
        formData.append("img_url", Imgs[i]);
      }
      formData.append("index", count + 1);
      formData.append("user", user.id);
      formData.append("name", userData.name);
      formData.append("direction", userData.direction);
      formData.append("price", EtherToWei(userData.price));
      formData.append("area", userData.area);
      formData.append("length", userData.length);
      formData.append("wide", userData.wide);
      formData.append("status", userData.status);
      formData.append("address", userData.address);
      formData.append("floor", userData.floor);
      formData.append("juridical", userData.juridical);
      formData.append("interior", userData.interior);
      formData.append("bedroom", userData.bedroom);
      formData.append("direction", userData.direction);
      formData.append("usablearea", userData.usablearea);

      try {
        const res = await dispatch(addPost(formData));
        console.log(res.payload.content._id);
        setId(() => res.payload.content._id);
        if (res.payload.content) {
          await PostProperty(res.payload.content._id, userData.price);
          navigate(`product?id=${res.payload.content._id}`);
          setLoading(() => false);
        }
      } catch (error) {
        console.log(error);
        setLoading(() => false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleFileUpload = (e) => {
    setImgs([...Imgs, e.target.files[0]]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const hanhleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {loading ? <Loader /> : ""}
      <div class="container">
        <div class="item item1">
          <h3 class="text-[18px] font-medium text-[#000] text-center ml-5 my-6">
            Real estate overview photo
          </h3>

          <div className="upload">
            <div>
              {/* {photo ? (
                <img className="upload-image" src={photo} alt="" />
              ) : (
                <BsImages className="upload-icon"></BsImages>
              )} */}
            </div>
            <div>
              {/* <input
                id="upload"
                type="file"
                name="img_url"
                multiple
                onChange={handleFileUpload}
              /> */}

              <label for="avatar" className="cursor-pointer hover:opacity-80">
                <img
                  className="upload-image"
                  src={imageUpload}
                  alt="uploadImage"
                />
              </label>

              <input
                type="file"
                id="avatar"
                name="avatar"
                hidden
                onChange={handleFileUpload}
              />
            </div>
          </div>
          <div className="w-[300px] mx-auto">
            {Imgs?.map((img) => (
              <div className="mini-img">
                <div>
                  <img
                    className="upload-mini-img"
                    src={URL.createObjectURL(img)}
                    alt=""
                  />
                </div>
                <div></div>
              </div>
            ))}
          </div>
        </div>
        <div class="item item2">
          <div className="select-item flex items-center justify-between">
            <div>
              <label className="title-item">
                List of Posts:
                {/* Danh Mục Tin Đăng: */}
              </label>
            </div>
            <select name="lang" className="option-item custom-input">
              <option value="">
                Please select a category
                {/* --Hãy chọn một danh mục-- */}
              </option>
              <option value="BDS">
                {/* Nhà riêng */}
                Private home{" "}
              </option>
              <option value="Text">
                {/* Chung cư  */}
                Condominium
              </option>
              <option value="Text">Biệt thự</option>
              <option value="Text">Shophouse</option>
              <option value="Text">Đất nền</option>
            </select>
          </div>

          <div className="info">
            <div className="address">
              <div className="title-address">Address</div>
              <div className="input-address">
                <input
                  type="text"
                  placeholder="  Address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="input-address-position custom-input"
                />
              </div>
            </div>

            <div className="details">
              <div className="title-details">Information Details</div>
              <div className="input-details">
                <input
                  type="text"
                  placeholder="Number of bedroom"
                  name="bedroom"
                  value={userData.bedroom}
                  onChange={handleChange}
                  className="input-details-num-bedroom custom-input"
                />

                <input
                  type="text"
                  placeholder="Number of bathroom"
                  name="bathroom"
                  value={userData.bathroom}
                  onChange={handleChange}
                  className="input-details-num-bathroom custom-input"
                />
                <br></br>
                <input
                  type="text"
                  placeholder="Direction"
                  name="direction"
                  value={userData.direction}
                  onChange={handleChange}
                  className="input-details-num-trend custom-input"
                />

                <input
                  type="text"
                  placeholder="Number of floor"
                  name="floor"
                  value={userData.floor}
                  onChange={handleChange}
                  className="input-details-num-floor custom-input"
                />
              </div>
            </div>

            <div className="info-more">
              <div className="title-info-more">Other Information</div>
              <div className="input--more">
                <input
                  type="text"
                  placeholder="  Juridical"
                  name="juridical"
                  value={userData.juridical}
                  onChange={handleChange}
                  className="input-paper custom-input"
                />

                <input
                  type="text"
                  placeholder="Interior"
                  name="interior"
                  value={userData.interior}
                  onChange={handleChange}
                  className="input-furniture custom-input"
                />
              </div>
            </div>

            <div className="area-price">
              <div className="title-area-price">Area and Price</div>
              <div className="input-area-price">
                <input
                  type="text"
                  placeholder="Area"
                  name="area"
                  value={userData.area}
                  onChange={handleChange}
                  className="input-area custom-input"
                />

                <input
                  type="text"
                  placeholder="Usable Area"
                  name="usablearea"
                  value={userData.usablearea}
                  onChange={handleChange}
                  className="input-area-use custom-input"
                />
                <br></br>
                <input
                  type="text"
                  placeholder="Wide"
                  name="wide"
                  value={userData.wide}
                  onChange={handleChange}
                  className="input-width custom-input"
                />

                <input
                  type="text"
                  placeholder="Length"
                  name="length"
                  value={userData.length}
                  onChange={handleChange}
                  className="input-height custom-input"
                />
                <br></br>

                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={userData.price}
                  onChange={handleChange}
                  className="input-price custom-input w-[592px]"
                />
              </div>
            </div>

            <div className="post">
              <div className="text-[18px] font-medium text-[#000] text-left ml-5">
                Title and Details
              </div>
              <div className="input-post">
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Post Title"
                  className="input-post-status custom-input"
                />
                <br></br>
                <textarea
                  className="post-detail-product custom-input"
                  placeholder=" Detail description"
                  type="text"
                  name="content"
                  value={userData.content}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="button-submit  my-6">
              <button className="button-submit-prev">PREVIEW</button>

              <button className="button-submit-post ml-4" onClick={onSubmit}>
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
