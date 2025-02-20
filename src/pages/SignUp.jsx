import axios from "axios";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const navigateToHome = useNavigate();
  
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(result => {
        
        const userInfo = { displayName, email };

        navigateToHome('/')
        
        axios.post('http://localhost:5000/users', userInfo)
          .then(response => {
            console.log('User registered successfully:', response.data);
          })
          .catch(error => {
            console.error('Error registering user:', error);
          });
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div>
      <div>
        <h1 className="text-5xl">Welcome From Task Manager</h1>
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center min-h-screen"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6"
          >
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="displayName" placeholder="Full Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                >
                  Sign Up
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;