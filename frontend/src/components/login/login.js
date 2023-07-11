import { Fragment, useState, useRef, useEffect } from "react";
import Img from "../../img/dautubatdongsanx.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/userSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { page } from "../pages/page.jsx";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail, isEmpty } from "validator";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Login() {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorEmail, setErrorMail] = useState(false);

  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);
  const form = useRef();
  const [open, setOpen] = useState(false);
  const isLoading = useSelector((state) => state.auth.isloading);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(() => isConnected);
    console.log("called");
  }, [isConnected]);

  const user = useSelector((state) => state.auth.user);
  const handleSignin = async (e) => {
    e.preventDefault();
    console.log("error", error);
    if (userData.email.length === 0) {
      setErrorMail(true);
    }
    console.log("Loading");
    try {
      const res = await dispatch(signin(userData));
      if (res) {
        navigate("page");
        alert("Successfully LoggedIn");
      }

      navigate("page");
    } catch (error) {
      console.log(error);
      alert("Unsuccessfull");
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log("hsbha.", userData);
  };

  const required = (value) => {
    if (isEmpty(value)) {
      return (
        <small className=" text-red-500 text-sm">
          <br />
          This field is required
        </small>
      );
    }
  };

  const email = (value) => {
    if (!isEmail(value)) {
      return (
        <small className=" text-red-500 text-sm">
          <br />
          Invalid email format
        </small>
      );
    }
  };

  return (
    <div className="w-1/4 h-auto border border-black content-center bg-neutral-800 inline-block py-6 rounded-lg my-16">
      <a href="/" className="text-amber-600 text-3xl text-center block my-5 uppercase">
        {""}
        Login
      </a>
      <Form className="form_container-login">
        <div className="">
          <Input
            className="border border-black inline-block my-4 w-9/12 h-12 rounded-md bg-neutral-600 p-2.5"
            type="email"
            placeholder="Email "
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            validations={[required, email]}
          />
          {errorEmail && userData.name <= 0 ? (
            <small className=" text-red-500 text-sm">
              <br />
              This field is required
            </small>
          ) : (
            ""
          )}
        </div>

        <div className="">
          <Input
            className="border border-black inline-block my-4 w-9/12 h-12 rounded-md bg-neutral-600 p-2.5"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            validations={[required]}
          />
        </div>
      </Form>

      <button
        href="/"
        className="border border-black inline-block my-4 w-9/12 h-12 rounded-md bg-neutral-600 hover:bg-neutral-400"
        onClick={handleSignin}
      >
        {" "}
        <span className="text-white font-bold text-[18px] letter tracking-widest">Login</span>
      </button>
      {message ? (
        <div className="text-green-500">{message}</div>
      ) : error === "sai tên đang nhập hoặc mật khẩu" ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="text-red-500"></div>
      )}
      <a href="" className="text-red-600 underline ">
        <h3>You forgot your password?</h3>
      </a>
      <br />

      <a href="" className="mb-4">
        <h3 className="text-white">You don't have an account?</h3>{" "}
        <h3 className="text-blue-500 underline">
          <Link to={"/register"} className="nav-link">
            Sign Up
          </Link>
        </h3>
      </a>
    </div>
  );
}
