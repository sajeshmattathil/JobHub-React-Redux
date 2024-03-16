import React, { useState } from "react";
import Navbar from "../../components/User/Navbar/UserNavbar";
import UserHome from "../../components/User/UserHome";
import SearchBar from "../../components/SearchBar";
import Sort from "../../components/User/Sort";
import { Socket } from "socket.io-client";

interface SearchValue {
  option : string;
  value : string;
}
const Home = ({socket} :{socket : Socket}) => {
  const [searchValue, setSearchValue] = useState<SearchValue | null>(null);
  const [sort, setSort] = useState<string>('');
  const handleSearch =  (option : string,value: string) => {
    setSearchValue({option,value});    
  };
  const handleSort = (value : string)=>{
    setSort(value)
  }
  return (
    <>
      <Navbar socket={socket} />
      <SearchBar  onSearchChange={handleSearch}  />
      <Sort onSortChange={handleSort}/>
      <UserHome searchData={searchValue}   sortData = {sort} />
    </>
  );
};

export default Home;
