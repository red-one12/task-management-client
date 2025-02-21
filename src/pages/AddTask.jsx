import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const AddTask = () => {
  const {user} = useContext(AuthContext);
  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const taskInfo = {title, description, email: user.email || 'Unknown', status: 'to-do'};
    // console.log(taskInfo);
    axios.post('http://localhost:5000/tasks', taskInfo)
    .then(result => {
      console.log('success', result.data);
    })
    .catch(err => {
      console.log('error', err);
    })
    
  }
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleAddTask} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" name="title" placeholder="Title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input type="text" name="description" placeholder="Description" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddTask;