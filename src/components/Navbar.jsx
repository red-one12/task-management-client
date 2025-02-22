import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/image/logo.png";
import axios from "axios";
import { ThemeContext } from "../provider/ThemeProvider";
import { CiDark, CiLight } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi"; // New React icons for toggle

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown toggle
  const navigateToHome = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (user && user.email) {
      // Make API request only if the user is authenticated
      axios
        .get(
          `https://task-manager-server-pi-ebon.vercel.app/users/${user.email}`
        )
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log("Error fetching user data:", err);
        });
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigateToHome("/");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };


  console.log(user);
  
  return (
    <div className="bg-color navbar bg-yellow-50 fixed top-0 z-50 w-full shadow-md">
      <div className="navbar-start">
        <div className="dropdown ml-2">
          <button
            onClick={toggleDropdown} // Add toggle function on button click
            className="lg:hidden"
          >
            {dropdownOpen ? (
              <FiX className="txt-color h-5 w-5" />
            ) : (
              <FiMenu className="txt-color h-5 w-5" />
            )}
          </button>
          {dropdownOpen && ( // Conditionally render dropdown menu
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-[#f9bb17] font-bold" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addTask"
                  className={({ isActive }) =>
                    isActive ? "text-[#f9bb17] font-bold" : ""
                  }
                >
                  Add Task
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={user ? "/myTask" : "/login"}
                  className={({ isActive }) =>
                    isActive ? "text-[#f9bb17] font-bold" : ""
                  }
                >
                  My Task
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/helpDesk"
                  className={({ isActive }) =>
                    isActive ? "text-[#f9bb17] font-bold" : ""
                  }
                >
                  Help Desk
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <Link to="/">
          <img className="w-[50px]" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="txt-color navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#f9bb17] font-bold" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/addTask"
            className={({ isActive }) =>
              isActive ? "text-[#f9bb17] font-bold" : ""
            }
          >
            Add Task
          </NavLink>

          <NavLink
            to={user ? "/myTask" : "/login"}
            className={({ isActive }) =>
              isActive ? "text-[#f9bb17] font-bold" : ""
            }
          >
            My Task
          </NavLink>

          <NavLink
            to="/helpDesk"
            className={({ isActive }) =>
              isActive ? "text-[#f9bb17] font-bold" : ""
            }
          >
            Help Desk
          </NavLink>
        </ul>
      </div>

      <div className="navbar-end">
        <button
          onClick={toggleTheme}
          className="text-2xl mr-2 md:mr-5 border-none txt-color text-black cursor-pointer"
        >
          {theme === "light" ? <CiLight /> : <CiDark />}
        </button>
        {user ? (
          <div className="txt-color flex items-center gap-4">
            <p className="hidden md:block font-bold uppercase">
              {currentUser.displayName
                ? currentUser.displayName
                : user.displayName}
            </p>
            <img
              src={currentUser.photoURL || "https://via.placeholder.com/150"}
              className="h-10 w-10 rounded-full"
              alt="User Profile"
            />

            <button onClick={handleLogout} className="btn bg-[#f9bb17]">
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn bg-[#f9bb17]">
              Log In
            </Link>
            <Link to="/signup" className="btn bg-[#03002e] text-white">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
