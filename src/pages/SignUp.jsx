import axios from "axios";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const navigateToHome = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const userInfo = { displayName, email, photoURL };

        navigateToHome("/");
        Swal.fire({
                            title: "Success",
                            text: "Successfully Created Account!",
                            icon: "success",
                          });

        axios
          .post(
            "https://task-manager-server-pi-ebon.vercel.app/users",
            userInfo
          )
          .then((response) => {
            console.log("User registered successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error registering user:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      {/* Back to Home Button */}
      <button
        onClick={() => navigateToHome("/")}
        className="absolute top-6 left-6 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 flex items-center"
      >
        <IoCaretBack />
        Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-card-color card bg-white shadow-2xl rounded-lg p-8 max-w-sm w-full"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="txt-color text-4xl font-bold text-gray-800 mb-2">
            Welcome
          </h2>
          <p className="text-lg text-gray-500">Create a new account</p>
        </motion.div>

        <form onSubmit={handleSignUp}>
          <div className="form-control mb-4">
            <label className="txt-color label text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="displayName"
              placeholder="Full Name"
              className="txt-color bg-card-color input input-bordered w-full py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="txt-color label text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="txt-color bg-card-color input input-bordered w-full py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="txt-color label text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="Photo URL"
              className="txt-color bg-card-color input input-bordered w-full py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              required
            />
          </div>
          <div className="form-control mb-6">
            <label className="txt-color label text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="txt-color bg-card-color input input-bordered w-full py-2 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              required
            />
          </div>

          <div className="form-control">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn w-full bg-yellow-500 py-2 px-4 rounded-md font-bold shadow-lg hover:from-yellow-400 hover:to-yellow-600 transition duration-300"
            >
              Sign Up
            </motion.button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
