import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { IoCaretBack } from "react-icons/io5";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To redirect after login

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        navigate("/"); 
      })
      .catch((err) => {
        setError("Invalid email or password"); 
        console.error(err);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate("/"); 
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Log In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
              required
            />
          </div>
          
          {/* Password input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Icon" className="w-6 h-6" />
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
    </div>
  );
};

export default Login;
