import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import logo from '../assets/image/logo.png'

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser()
    .then(() => {
      navigateToHome("/");
    })
    .catch((error) => console.error("Logout error:", error));
  };

  // console.log(user.email);
  

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/addTask'>Add Task</NavLink>
            </li>
            <li>
            <NavLink to='/myTask'>My Task</NavLink>
            </li>
            <li>
            <NavLink to='/helpDesk'>Help Desk</NavLink>
            </li>
          </ul>
        </div>
        <Link to='/'>
          <img className="w-[50px]" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li>
              <NavLink to='/'>Home</NavLink>
            </li>
        <li>
              <NavLink to='/addTask'>Add Task</NavLink>
            </li>
            <li>
            <NavLink to='/myTask'>My Task</NavLink>
            </li>
            <li>
            <NavLink to='/helpDesk'>Help Desk</NavLink>
            </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn bg-[#f9bb17]">
            Log Out
          </button>
        ) : (
          <>
            <Link to="/login" className="btn bg-[#f9bb17]">
              Log In
            </Link>
            <Link to="/signup" className="btn bg-[#03002e] text-white">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
