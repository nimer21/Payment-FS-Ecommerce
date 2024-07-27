import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "./../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  //console.log("Header", user);

  const dispatch = useDispatch();

  const [menuDisplay, setmenuDisplay] = useState(false);

  const context = useContext(Context);

  const navigate = useNavigate();

  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");

  const [search,setSearch] = useState(searchQuery); //searchInput?.search?.split("=")[1]

  //console.log("searchInput", searchInput?.search.split("=")[1]);

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });
      const data = await fetchData.json();
      if (data.success) {
        //console.log("Logged out successfully");
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        //console.error("Failed to log out");
        toast.error(data.message);
      }
      //localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  //console.log("Header add to cart count", context);
  const handleSearch = (e)=>{
    //console.log("Search clicked");
    const { value } = e.target;
    setSearch(value);
    if (value){
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
  };
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"} className="">
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within: shadow pl-2">
          <input
            type="text"
            placeholder="Search Products here"
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setmenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="text-sm whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setmenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link to={"/profile"} className="block px-4 py-2 text-sm">
                    Profile
                  </Link>
                  <Link to={"/order"} 
                  className="text-sm whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                  onClick={() => setmenuDisplay((preve) => !preve)}>
                    Orders
                  </Link>
                  <Link to={"/logout"} className="block px-4 py-2 text-sm">
                    Logout
                  </Link>
                  {/* <a
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                More
              </a> */}
                </nav>
              </div>
            )}
          </div>
         
            {user?._id &&
              (context.cartProductCount === 0 ? (
                <p className="text-xs text-gray-500">Cart is empty</p>
              ) : (
                <Link to="/cart" className="text-2xl relative">
                  <span>
                    <FaShoppingCart />
                  </span>
                  <p className="text-xs text-gray-500">
                    Cart ({context.cartProductCount})
                  </p>
                  <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                    <p className="text-sm">{context.cartProductCount}</p>
                  </div>
                  </Link>
              ))}
          
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
