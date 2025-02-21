import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import HelpDesk from "../pages/HelpDesk";
import MyTask from "../pages/MyTask";
import AddTask from "../pages/AddTask";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addTask",
        element: <AddTask></AddTask>,
      },
      {
        path: "/myTask",
        element: (
          // <DndProvider backend={HTML5Backend}>
            <MyTask></MyTask>
          // </DndProvider>
        ),
      },
      {
        path: "/helpDesk",
        element: <HelpDesk></HelpDesk>,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
