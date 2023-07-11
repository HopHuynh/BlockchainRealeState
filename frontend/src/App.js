import "./App.css";
import { Route, Routes } from "react-router-dom";
import Product from "../src/components/product/product";

import Register from "../src/components/register/register";
import Login from "../src/components/login/login";
import Postsell from "../src/components/postsell/components/Post";
import Search from "./components/search/Search";
import Header from "../src/components/header/header";
import Footer from "../src/components/footer/footer";
import Homepage from "../src/components/homepage/Home";
import Chatbox from "../src/components/chatbox/chatbox";
import ModalFilter from "./components/modalfilter.js/ModalFilter";
import ProductUser from "../src/components/productUer.js/productUser";
import Goverment from "./components/goverment/goverment";
// import Header from "../src/components/header/header";
import Map from "../src/components/map";
import AdminPage from "./components/pages/admin/AdminPage";
import ProfilePage from "./components/profile/ProfilePage";
import AuthenticationDoc from "./components/authenticationDoc/authenticationDoc";
import UserProfile from "./components/profile/UserProfile";
import ResetPassword from "./components/resetpassword/ResetPassword";
import ListProcess from "./components/listProcess/listProcess";
// import Goverment from "./components/Government/Government";
import Notification from "./components/notification/notification";
import MyHomePage from "./components/MyHomePage/MyHomePage";
import { useState } from "react";

function App() {
  const [notifBox, setNotifBox] = useState([]);

  return (
    <div className="App">
      {/* <WagmiConfig client={wagmiClient}> */}
      <Header setNotifBox={setNotifBox}></Header>

      <Routes>
        <Route path="/myhome" element={<MyHomePage />} />
        <Route path="/login/page" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/postsell" element={<Postsell />} />
        <Route path="/product" element={<Product />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/modalfilter" element={<ModalFilter />} />
        <Route path="/postsell/product" element={<Product />} />
        <Route path="/search/product" element={<Product />} />
        <Route path="/homepage/product" element={<Product />} />
        <Route path="/login/page/product" element={<Product />} />
        <Route path="/productuser" element={<ProductUser />} />
        <Route path="/productuser/product" element={<Product />} />
        {/* <Route path="/modalFilter" element={<ModalFilter />} />  */}
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/listprocess" element={<ListProcess />} />
        <Route path="/government" element={<Goverment />} />
        <Route
          path="/notification"
          element={<Notification notis={notifBox} />}
        />
        <Route path="/authenticationdoc" element={<AuthenticationDoc />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      <Footer></Footer>
      {/* </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </div>
  );
}
export default App;
