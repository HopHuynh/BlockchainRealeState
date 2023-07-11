import { Fragment, useState } from "react";
import Imglogo from "../../img/dautubatdongsanx.png";
import { logout } from "../../redux/userSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
export default function Header() {
  const user = useSelector((state) => state.auth.user);
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  console.log("user1", user);
  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());

    // if (!user) {
    //   window.location.replace("/login");
    // }
  };
  if (!user) {
    window.location.replace("/homepage");
  }
  return (
    <div>
      <a href="/" className="w-28 inline-block hover:opacity-50 float-left ">
        <img src={Imglogo} alt={Imglogo}></img>
        <h2 className="text-xl font-bold text-center"> bất động sản </h2>
      </a>
      <ul className="flex space-x-3 content-center ">
        <li className="inline-block">
          {" "}
          <a href="/" className="hover:text-blue-300">
            {" "}
            Trang Chủ
          </a>
        </li>
        <li className="inline-block">
          {" "}
          <a href="/" className="hover:text-blue-300">
            {" "}
            Sản Phẩm{" "}
          </a>
        </li>
        <li className="inline-block">
          {" "}
          <a href="/" className="hover:text-blue-300" onClick={handleLogout}>
            {" "}
            Đăng Xuất{" "}
          </a>
        </li>
      </ul>
    </div>
  );
}
