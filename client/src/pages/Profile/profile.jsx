import React from "react";
import { Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components";
import ProfileSidebar from "../../components/ProfileSidebar/profileSidebar";

import "./profile.css";

const Profile = () => {
  return (
    <>
      <Header />
      <div className="profile mt-5">
        <Row>
          <div className="col-lg-3 col-md-2 col-2 p-0">
            <div className="profile-left">
              <ProfileSidebar />
            </div>
          </div>
          <div className="col-lg-9 col-md-10 col-10 ps-1">
            <div className="profile-right">
              <Outlet></Outlet>
            </div>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
