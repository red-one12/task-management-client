import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useDrag, useDrop } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing edit and trash icons

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  if (!user) {
    return <div className="loading"></div>;
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${user.email}`)
      .then(res => {
        setTasks(res.data);
      })
      .catch(err => {
        console.log('Error fetching tasks:', err);
      });
  }, [user.email]);

  // Handle task update after drag-and-drop
  const updateTaskStatus = (taskId, status) => {
    axios.put(`http://localhost:5000/tasks/${taskId}`, { status })
      .then(res => {
        // Task updated successfully on the server
      })
      .catch(err => {
        console.log('Error updating task status:', err);
      });
  };

  // Handle task delete
  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`)
      .then(res => {
        // Remove deleted task from state
        setTasks(tasks.filter(task => task._id !== taskId));
      })
      .catch(err => {
        console.log('Error deleting task:', err);
      });
  };

  // Handle task edit (for now, just logging task id)
  const handleEdit = (task) => {
    console.log("Edit task:", task);
    // Implement your edit functionality here, such as opening a modal with the task details.
  };

  // Drag Source: Task
  const DraggableTask = ({ task }) => {
    const [, drag] = useDrag(() => ({
      type: "task",
      item: { id: task._id, status: task.status },
    }));

    return (
      <div ref={drag} className="bg-white p-3 rounded shadow mb-2">
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        {/* Edit and Delete Icons */}
        <div className="flex justify-end gap-2 mt-2">
          <FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEdit(task)} />
          <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(task._id)} />
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
          // Optimistic UI update: Move task immediately in the state
          const updatedTasks = tasks.map((task) => 
            task._id === item.id ? { ...task, status } : task
          );
          setTasks(updatedTasks);

          // Now update the server
          updateTaskStatus(item.id, status);
        }
      },
    }));

    
    const containerStyle = {
      "to-do": "bg-gray-100",
      "in-progress": "bg-blue-100",
      "done": "bg-green-100",
    };

    return (
      <div ref={drop} className={`${containerStyle[status]} p-4 rounded-lg shadow-md`}>
        <h2 className="text-xl font-semibold mb-3 capitalize">{status}</h2>
        {children}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {/* To-Do Section */}
      <DropContainer status="to-do">
        {tasks.filter(task => task.status === "to-do").map(task => (
          <DraggableTask key={task._id} task={task} />
        ))}
      </DropContainer>

      {/* In-Progress Section */}
      <DropContainer status="in-progress">
        {tasks.filter(task => task.status === "in-progress").map(task => (
          <DraggableTask key={task._id} task={task} />
        ))}
      </DropContainer>

      {/* Done Section */}
      <DropContainer status="done">
        {tasks.filter(task => task.status === "done").map(task => (
          <DraggableTask key={task._id} task={task} />
        ))}
      </DropContainer>
    </div>
  );
};

export default MyTask;
