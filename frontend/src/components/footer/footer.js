import { Fragment, react } from "react";
import {
  BsFillTelephoneForwardFill,
  BsPersonFillExclamation,
  BsHeadphones,
} from "react-icons/bs";
import Logoft from "../../img/zyro-image.png";
import "../footer/footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-img">
            <img className="logo-footer" src={Logoft} alt={Logoft}></img>
          </div>
          <div className="footer-infor">
            <div className="flex justify-center items-center w-80">
              <BsFillTelephoneForwardFill className="footer-icon"></BsFillTelephoneForwardFill>
              <span className="footer-span">Contact</span>
            </div>
            <div className="flex justify-center items-center w-80">
              <BsPersonFillExclamation className="footer-icon"></BsPersonFillExclamation>
              <span className="footer-span">Customer Support</span>
            </div>
            <div className="flex justify-center items-center w-80">
              <BsHeadphones className="footer-icon"></BsHeadphones>
              <span className="footer-span">Customer Care</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footer-infor">
        <div className="flex justify-center items-center w-80">
          <BsFillTelephoneForwardFill className="footer-icon"></BsFillTelephoneForwardFill>
          <span className="footer-span ml-1">Liên hệ</span>
        </div>
        <div className="flex justify-center items-center w-80">
          <BsPersonFillExclamation className="footer-icon"></BsPersonFillExclamation>
          <span className="footer-span ml-1">Hỗ trợ khách hàng</span>
        </div>
        <div className="flex justify-center items-center w-80">
          <BsHeadphones className="footer-icon"></BsHeadphones>
          <span className="footer-span ml-1">Chăm sóc khách hàng</span>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
