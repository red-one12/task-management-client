import { useContext, useState } from "react";
import { motion } from "framer-motion";
import helpLottie from "../assets/lottie/help lottie.json";
import Lottie from "lottie-react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const HelpDesk = () => {
  const { user } = useContext(AuthContext);

  // State for form
  const [formData, setFormData] = useState({ email: user?.email || "", problem: "" });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, problem } = formData;

    // Frontend validation
    if (!email.trim() || !problem.trim()) {
      Swal.fire({
        title: "Error",
        text: "Email and Problem description are required!",
        icon: "warning",
      });
      return;
    }

    const helpInfo = { email, problem };

    axios
      .post("http://localhost:5000/helps", helpInfo)
      .then((response) => {
        if (response.data?.acknowledged) {
          Swal.fire({
            title: "Success",
            text: "Your issue has been submitted!",
            icon: "success",
          });
          setFormData({ email: user?.email || "", problem: "" }); // Reset form
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to submit. Try again!",
            icon: "error",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again!",
          icon: "error",
        });
      });
  };

  return (
    <div className="py-28 px-4 bg-gray-50">
      <h2 className="text-center text-4xl font-bold text-gray-800">
        Help <span className="text-yellow-500">Desk</span>
      </h2>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16 mt-10">
        
        {/* Animation Section */}
        <div className="w-full max-w-sm lg:max-w-md">
          <Lottie animationData={helpLottie} loop={true} />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md">
          <motion.div
            className="w-full rounded-lg bg-white p-8 shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>

              {/* Problem Textarea */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Your Problem</label>
                <motion.textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="Describe your issue"
                  rows="4"
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
                  whileFocus={{ scale: 1.02 }}
                  required
                ></motion.textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full rounded-lg bg-yellow-500 py-3 text-white text-lg font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
