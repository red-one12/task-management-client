import { useDrag } from "react-dnd";

const TaskItem = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id }, // ✅ Now only this task moves
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white p-3 rounded shadow mb-2 cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h3 className="font-medium">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
};

export default TaskItem;
