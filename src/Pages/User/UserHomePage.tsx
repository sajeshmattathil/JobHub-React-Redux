import  { useState } from "react";
import UserHome from "../../components/User/UserHome";
import SearchBar from "../../components/SearchBar";
import Sort from "../../components/User/Sort";
import UserNavbar from "../../components/User/Navbar/UserNavbar";

interface SearchValue {
  option : string;
  value : string;
}
const UserHomePage = () => {
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
      <UserNavbar/>
      <SearchBar  onSearchChange={handleSearch}  />
      <Sort onSortChange={handleSort}/>
      <UserHome searchData={searchValue} sortData = {sort} />
    </>
  );
};

export default UserHomePage;
