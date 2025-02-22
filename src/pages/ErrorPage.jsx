import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import LottieError from "../assets/lottie/lottieError.json";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-80 h-80">
        <Lottie animationData={LottieError} loop={true} />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
      <p className="text-lg text-gray-600 mb-6">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
