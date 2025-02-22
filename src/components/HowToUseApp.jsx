import {
  FaUserPlus,
  FaSignInAlt,
  FaTasks,
  FaCheckCircle,
  FaHeadset,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const HowToUseApp = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create an account to get started.",
      icon: <FaUserPlus className="text-4xl text-yellow-500" />,
      link: "/signup",
    },
    {
      id: 2,
      title: "Log In",
      description: "Access your account with your credentials.",
      icon: <FaSignInAlt className="text-4xl text-blue-500" />,
      link: "/login",
    },
    {
      id: 3,
      title: "Add a Task",
      description: "Create tasks and organize your work.",
      icon: <FaTasks className="text-4xl text-green-500" />,
      link: "/addTask",
    },
    {
      id: 4,
      title: "Complete Tasks",
      description: "Mark tasks as completed when done.",
      icon: <FaCheckCircle className="text-4xl text-purple-500" />,
      link: "/myTask",
    },
    {
      id: 5,
      title: "Get Support",
      description: "Reach out to our help desk if needed.",
      icon: <FaHeadset className="text-4xl text-red-500" />,
      link: "/helpDesk",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6 py-10 px-5">
      <h2 className="txt-color text-3xl font-bold text-center">How to Use Our App</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-card-color card bg-base-100 shadow-xl p-6 text-center transition-transform duration-300 hover:scale-105"
          >
            <div className="flex justify-center">{step.icon}</div>
            <div className="card-body">
              <h3 className="txt-color card-title">{step.title}</h3>
              <p className="text-gray-600 text-start">{step.description}</p>
              <div className="flex justify-center mt-3">
                <Link
                  to={step.link}
                  className="btn bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 animate-pulse hover:bg-yellow-600 hover:shadow-lg"
                >
                  GO
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToUseApp;
