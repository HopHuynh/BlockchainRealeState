import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { _baseUrl } from "../../Utils/Axios";
import vinhome7 from "../../img/vinhome7.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updatepost } from "../../redux/userSlice/postSlice";
const Sale = ({ items }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const NavigateNadSet = () => {
    dispatch(updatepost(items));
    navigate(`/product?id=${items._id}`);
  };
  if (!items) return;

  // console.log("Debug ===>", items);

  return (
    <div
      key={items}
      className="indvProperty w-full hover:-translate-y-1 cursor-pointer relative"
    >
      <div onClick={() => NavigateNadSet()}>
        <div className=" product-sell">
          <img
            className="img-bds"
            alt="#"
            // src={vinhome7}
            src={`${_baseUrl}/img/${items.img_url[0]}`}
          />
          {/* <div className="title-bds">
            <h2>{items.uri}</h2>
          </div> */}
          <div className="p-3 flex flex-col">
            <div className="area-bds">
              <span className="span-bds">Name : {items.name}</span>
            </div>
            <div className="area-bds">
              <span className="span-area">Area : {items.area} m²</span>
            </div>
            <div className="address-bds">
              <span>Address:{items.address}</span>
            </div>
            <div className="price-bds">
              <span className="span-bds">{items.price / 1e18} VND</span>
            </div>
          </div>
          <div className="RentPropertyButton hover:opacity-80">
            Detail Property
          </div>
        </div>
      </div>
      {/* <div className="absolute top-[48%] left-5 bg-[#ff8c00] p-2 rounded-md">
        <p className="text-[16px] font-bold text-[#fff]">Unique 1x1 Lands</p>
      </div> */}
    </div>
  );
};

export default Sale;
