import React, { useState } from "react";
import Navbar from "../../components/User/Navbar/userNavbar";
import UserHome from "../../components/User/UserHome";
import SearchBar from "../../components/SearchBar";
import Sort from "../../components/User/Sort";

const Home = () => {
  const [location, setLocation] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const handleLocation =  (value: string) => {

    setLocation(value);    
  };
  const handleSort = (value : string)=>{
    setSort(value)
  }
  return (
    <>
      <Navbar />
      <SearchBar onLocationChange={handleLocation}  />
      <Sort onSortChange={handleSort}/>
      <UserHome locationData={location} sortData = {sort} />
    </>
  );
};

export default Home;
