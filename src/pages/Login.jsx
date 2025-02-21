import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

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
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          {/* Password input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Display error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#f9bb17] text-white py-2 rounded-lg"
          >
            Log In
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Icon" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#03002e] font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
