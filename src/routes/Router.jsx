import {
  createBrowserRouter,

} from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>
  },
  {
    path: '/login',
    element: <Login></Login>
  }
]);


export default router;