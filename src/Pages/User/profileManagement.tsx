import React from "react";
import UserProfileManagement from "../../components/User/UserProfileManagement";
import Navbar from "../../components/User/Navbar/userNavbar";

const profileManagement = () => {
  return (
    <>
      <Navbar />
      <UserProfileManagement />
    </>
  );
};

export default profileManagement;
