import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useDrag, useDrop } from "react-dnd";

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [updatedTask, setUpdatedTask] = useState(null);

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
        setUpdatedTask(res.data);
      })
      .catch(err => {
        console.log('Error updating task status:', err);
      });
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
      </div>
    );
  };

  // Drop Target: Container (To-Do, In-Progress, Done)
  const DropContainer = ({ status, children }) => {
    const [, drop] = useDrop(() => ({
      accept: "task",
      drop: (item) => {
        if (item.status !== status) {
          updateTaskStatus(item.id, status);
        }
      },
    }));

    return (
      <div ref={drop} className={`bg-${status}-100 p-4 rounded-lg shadow-md`}>
        <h2 className="text-xl font-semibold mb-3">{status}</h2>
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
