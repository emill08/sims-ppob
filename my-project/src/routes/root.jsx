import {
    createBrowserRouter,
    // redirect
} from "react-router-dom";
import RegisterPage from "../views/RegisterPage";

const router = createBrowserRouter([
    {
      path: "/home",
      element: <RegisterPage />,
    },
  ]);

export default router