import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import "./ProfileStyle.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) return navigate("/login");
  }, [user, navigate]);
  return (
    <>
      <div className="page-container">
        <section className="profile-section">
          <div className="profile-container">
            <ProfileMenu />
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
