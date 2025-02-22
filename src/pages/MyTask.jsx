import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useDrag, useDrop } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  if (!user) {
    return <div className="loading"></div>;
  }

  useEffect(() => {
    axios
      .get(`https://task-manager-server-pi-ebon.vercel.app/tasks/${user.email}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log("Error fetching tasks:", err);
      });
  }, [user.email]);

  // Open Modal for Editing
  const handleEdit = (task) => {
    setSelectedTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setIsModalOpen(true);
  };

  // Handle Update Submission
  const handleUpdate = () => {
    if (!selectedTask) return;

    const updatedTask = {
      title: updatedTitle,
      description: updatedDescription,
    };

    axios
      .put(
        `https://task-manager-server-pi-ebon.vercel.app/tasks/${selectedTask._id}`,
        updatedTask
      )
      .then((res) => {
        setTasks(
          tasks.map((task) =>
            task._id === selectedTask._id ? { ...task, ...updatedTask } : task
          )
        );
        setIsModalOpen(false);
        setSelectedTask(null);
      })
      .catch((err) => {
        console.log("Error updating task:", err);
      });
  };

  // Handle task delete
  const handleDelete = (taskId) => {
    axios
      .delete(`https://task-manager-server-pi-ebon.vercel.app/tasks/${taskId}`)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Your Taks Has Been Deleted!",
          icon: "success",
        });
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((err) => {
        console.log("Error deleting task:", err);
      });
  };

  // Drag Source: Task
  const DraggableTask = ({ task }) => {
    const [, drag] = useDrag(() => ({
      type: "task",
      item: { id: task._id, status: task.status },
    }));

    return (
      <div
        ref={drag}
        className="bg-white p-4 rounded-lg shadow-lg border border-gray-300 hover:shadow-2xl transition-all duration-300"
      >
        <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <div className="flex justify-end gap-3 mt-3">
          <button
            className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => handleEdit(task)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
            onClick={() => handleDelete(task._id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    );
  };

  // Drop Target: Container (To-Do, In-Progress, Done)
  const DropContainer = ({ status, children }) => {
    const [, drop] = useDrop(() => ({
      accept: "task",
      drop: (item) => {
        if (item.status !== status) {
          const updatedTasks = tasks.map((task) =>
            task._id === item.id ? { ...task, status } : task
          );
          setTasks(updatedTasks);
          axios.put(
            `https://task-manager-server-pi-ebon.vercel.app/tasks/${item.id}`,
            { status }
          );
        }
      },
    }));

    const containerStyles = {
      "to-do": "bg-card-color bg-red-100 border-red-400",
      "in-progress": "bg-card-color bg-yellow-100 border-yellow-400",
      done: "bg-card-color bg-green-100 border-green-400",
    };

    return (
      <div
        ref={drop}
        className={`p-6 rounded-lg shadow-md border ${containerStyles[status]}`}
      >
        <h2 className="text-xl font-semibold mb-3 text-gray-700 capitalize">
          {status}
        </h2>
        <div className="space-y-3">{children}</div>
      </div>
    );
  };

  return (
    <div className="pt-40 grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
      <DropContainer status="to-do">
        {tasks
          .filter((task) => task.status === "to-do")
          .map((task) => (
            <DraggableTask key={task._id} task={task} />
          ))}
      </DropContainer>

      <DropContainer status="in-progress">
        {tasks
          .filter((task) => task.status === "in-progress")
          .map((task) => (
            <DraggableTask key={task._id} task={task} />
          ))}
      </DropContainer>

      <DropContainer status="done">
        {tasks
          .filter((task) => task.status === "done")
          .map((task) => (
            <DraggableTask key={task._id} task={task} />
          ))}
      </DropContainer>

      {/* Modal for Editing Task */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Edit Task
            </h2>
            <label className="block mb-2 text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <label className="block mb-2 text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTask;
