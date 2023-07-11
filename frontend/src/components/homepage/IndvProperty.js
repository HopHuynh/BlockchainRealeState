import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import convertWeiToEther from "../../Utils/ConvertWeiToEther";
import { _baseUrl } from "../../Utils/Axios";
import { indexApi } from "../ContextApi/IdContextApi";
import UseRentOrNot from "../../hooks/RentOrNot";
import { useDispatch, useSelector } from "react-redux";
import { updatepost } from "../../redux/userSlice/postSlice";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Sale from "./Sale";
const IndvProperty = ({ loading, name, posts }) => {
  const dispatch = useDispatch();
  const handlechange = (post) => {
    // e.preventDefault();
    console.log("postaaa,",post)
    dispatch(updatepost(post));
  };
  return (
    <div className="propertyMainContainer w-full relative">
      <div
        className={`${
          posts.length > 4 ? "custom-icon custom-icon-left" : "hidden"
        }`}
        >
        <FiChevronLeft className="text-[30px]" />
      </div>
      <div
        className={`${
          posts.length > 4 ? "custom-icon custom-icon-right" : "hidden"
        }`}
        >
        <FiChevronRight className="text-[30px]" />
      </div>
      {loading ? (
        <div className="PlzSelect loading">...Loading...</div>
      ) : posts.length === 0 ? (
        <div className="PlzSelect">No {name} Property To Show</div>
      ) : (
        <div className="propertyContainer">
            {posts.map((items, index) => {
              return (
                <div>
                  <Sale items={items} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default IndvProperty;
