import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import logo from '../assets/image/logo.png';
import axios from "axios";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([]);
  const navigateToHome = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      // Make API request only if the user is authenticated
      axios.get(`http://localhost:5000/users/${user.email}`)
        .then(res => {
          setCurrentUser(res.data);
        })
        .catch(err => {
          console.log('Error fetching user data:', err);
        });
    }
  }, [user]);  // Re-run effect if the `user` changes

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigateToHome("/");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <div className="navbar bg-yellow-50 fixed top-0 z-50 w-full shadow-md">
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
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "text-[#f9bb17] font-bold" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addTask"
                className={({ isActive }) => isActive ? "text-[#f9bb17] font-bold" : ""}
              >
                Add Task
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myTask"
                className={({ isActive }) => isActive ? "text-[#f9bb17] font-bold" : ""}
              >
                My Task
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/helpDesk"
                className={({ isActive }) => isActive ? "text-[#f9bb17] font-bold" : ""}
              >
                Help Desk
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to="/">
          <img className="w-[50px]" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-10">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "text-[#f9bb17] font-bold" : ""}
          >
            Home
          </NavLink>

          <NavLink
            to="/addTask"
            className={({ isActive }) => isActive ? "text-[#f9bb17] font-bold" : ""}
          >
            Add Task
          </NavLink>

          <NavLink
            to="/myTask"
            className={({ isActive }) => isActive ? "text-[#f9bb17] font-bold" : ""}
          >
            My Task
          </NavLink>

          <NavLink
            to="/helpDesk"
            className={({ isActive }) => isActive ? "text-[#f9bb17] font-bold" : ""}
          >
            Help Desk
          </NavLink>
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <p className="hidden md:block font-bold uppercase">{currentUser.displayName ? currentUser.displayName : user.displayName}</p>
            <img src={currentUser.photoURL || "https://via.placeholder.com/150"} className="h-10 w-10 rounded-full" alt="User Profile" />
            
            <button onClick={handleLogout} className="btn bg-[#f9bb17]">
              Log Out
            </button>
          </div>
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
