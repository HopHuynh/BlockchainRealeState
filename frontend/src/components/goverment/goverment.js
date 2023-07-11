import { Fragment, react } from "react";
import { useDispatch, useSelector } from "react-redux";
import authHeader from "../../services/auth.header";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import React, { useEffect, useState } from "react";
import "./goverment.css";
import { BsPinMap } from "react-icons/bs";
import { FiMap } from "react-icons/fi";
import { GiNewspaper } from "react-icons/gi";

const Goverment = () => {
  const [upload, setUpload] = useState({});
  const [photo, setPhoto] = useState("");
  const [file, setFile] = useState("");

  const [params, setParams] = useSearchParams();
  const [showElement, setShowElement] = useState(false);
  const [id, setID] = useState();

  console.log("Debug ===> In Goverment");

  useEffect(() => {
    var _id = params.get("id");
    setID(_id);
  }, [params]);

  useEffect(() => {
    console.log("Debug ====> fetch");
    axios
      .get(`http://localhost:5000/authDocs/${id}`)
      .then((res) => {
        console.log(res);
        // const detailFile = res.data;
        // setUpload(detailFile);
        // setPhoto(urls);
        // setFile(detailFile?.content?.price);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="goverment-body">
      <div className="goverment-product">
        <div className="goverment-product-title">
          <span>Real Estate ID: .......</span>
          <br />
          <span>Detail Description of the property</span>
        </div>
        <div className="goverment-product-details">
          <div className="goverment-product-address">
            <BsPinMap className="goverment-icon"></BsPinMap>
            Address:
            <span></span>
          </div>

          <div className="goverment-product-area">
            <FiMap className="goverment-icon"></FiMap>
            Area:
            <span></span>
          </div>

          {/* <div className="goverment-product-juridical">
                        <GiNewspaper className="goverment-icon"></GiNewspaper>
                        Juridical: Sổ đỏ, Không tranh chấp đất đai
                        <span>
                        </span>
                    </div> */}
        </div>
        {/* <div className="goverment-document">
                    <span className="goverment-document-title">
                        Judical papge
                        </span>
                    <br/>
                    <a href="https://docs.google.com/document/d/1-o5FvmXr88SUFcfP4pPntem-DubHKeSK/edit?usp=share_link&ouid=101234580618355106520&rtpof=true&sd=true" 
                        target="_blank" rel="noopener noreferrer">
                            Hợp đồng mua bán đất.doc
                    </a>
                    <h2>{upload?.content?.file}</h2>
                </div> */}
      </div>

      <div className="goverment-both-sides">
        <div className="goverment-buyer">
          <span>Transaction confirmation image</span>
          <div className="goverment-seller-upload">
            <a
              href="https://accgroup.vn/wp-content/uploads/2021/12/3-4.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="goverment-img-authentication"
                src="https://accgroup.vn/wp-content/uploads/2021/12/3-4.png"
              ></img>
            </a>
          </div>
        </div>
        <div className="goverment-seller">
          <span>Transaction confirmation image</span>
          <div className="goverment-seller-upload">
            <a
              href="https://www.nhalocphat.vn/resources/uploadfile/uploads/mau-hop-dong-dat-coc-mua-ban-nha-dat-don-gian.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="goverment-img-authentication"
                src="https://www.nhalocphat.vn/resources/uploadfile/uploads/mau-hop-dong-dat-coc-mua-ban-nha-dat-don-gian.jpg"
              ></img>
            </a>
          </div>
        </div>
      </div>

      <div className="goverment-confirm-content">
        {showElement && (
          <div id="goverment-confirm">
            <span>Xác nhận hoàn thành quá trình mua bán bất động sản</span>
            <br />

            <button className="confirm">Confirm</button>
          </div>
        )}
      </div>

      <div className="goverment-confirm">
        <button className="goverment-return">Return</button>
        <button className="goverment-next" onClick={() => setShowElement(true)}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Goverment;
