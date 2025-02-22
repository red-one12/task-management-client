import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const taskInfo = { title, description, email: user.email || "Unknown", status: "to-do" };

    axios
      .post("http://localhost:5000/tasks", taskInfo)
      .then((result) => {
         Swal.fire({
                    title: "Success",
                    text: "Your Task Has Been Added!",
                    icon: "success",
                  });
                  navigate('/myTask')
        console.log("success", result.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-lg bg-white/80 shadow-xl backdrop-blur-md p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">Add New Task</h2>
        <form onSubmit={handleAddTask} className="mt-6">
          {/* Title Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-gray-700 font-semibold">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              className="input input-bordered w-full bg-white/90 focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Description Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-gray-700 font-semibold">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter task details"
              className="textarea textarea-bordered w-full bg-white/90 focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn bg-yellow-500 text-white text-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-600 transition-all duration-300">
              <FaPlus />
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
