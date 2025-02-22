import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { IoCaretBack } from "react-icons/io5";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser, googleLogin, user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        navigate("/");
        Swal.fire({
                    title: "Success",
                    text: "Successfully Logged In!",
                    icon: "success",
                  });
      })
      .catch((err) => {
        setError("Invalid email or password");
        console.error(err);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const loggedInUser = result.user;
        if (loggedInUser) {
          axios
            .get(`https://task-manager-server-pi-ebon.vercel.app/users/${loggedInUser.email}`)
            .then((res) => {
              Swal.fire({
                          title: "Success",
                          text: "Successfully Logged In!",
                          icon: "success",
                        });
              if (!res.data) {
                const userInfo = {
                  displayName: loggedInUser.displayName,
                  email: loggedInUser.email,
                  photoURL: loggedInUser.photoURL,
                };
                return axios.post("https://task-manager-server-pi-ebon.vercel.app/users", userInfo);
              }
            })
            .then(() => {
              navigate("/");
            })
            .catch((err) => {
              console.error("Google Login Error:", err);
            });
        }
      })
      .catch((err) => {
        console.error("Error logging in with Google:", err);
      });
  };

  useEffect(() => {
    if (user) {
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      axios
        .post("https://task-manager-server-pi-ebon.vercel.app/users", userInfo)
        .then((response) => {
          console.log("User registered successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    }
  }, [user]);

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 flex items-center"
      >
        <IoCaretBack />
        Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="card shadow-2xl rounded-lg p-8 max-w-sm w-full"
      >
        <div className="bg-card-color w-full max-w-md p-8 bg-white rounded-lg">
          <h2 className="txt-color text-3xl font-semibold text-center text-gray-800 mb-8">Log In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div>
              <label htmlFor="email" className="txt-color block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="txt-color w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password" className="txt-color block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="txt-color w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Display error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition duration-300"
            >
              Log In
            </button>
          </form>

          {/* Google Sign-In Button */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition duration-300"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google Sign-In Icon"
                className="w-6 h-6"
              />
              <span className="text-sm text-gray-700">Continue with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-yellow-500 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
