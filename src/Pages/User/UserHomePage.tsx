import  { useState } from "react";
import UserHome from "../../components/User/UserHome";
import SearchBar from "../../components/SearchBar";
import Sort from "../../components/User/Sort";
import UserNavbar from "../../components/User/Navbar/UsersNavbar";

interface SearchValue {
  industry ?: industryInterface[] | [];
  sort?: string;
  option?: string;
  value?: string;
  salaryPackage?: number;
}
interface industryInterface {
  industry: string;
}
const UserHomePage = () => {
  const [searchValue, setSearchValue] = useState<SearchValue >({
    option: "",
        value: "",
  });
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
