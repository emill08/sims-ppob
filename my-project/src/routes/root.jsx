import {
    createBrowserRouter,
    // redirect
} from "react-router-dom";
import RegisterPage from "../views/RegisterPage";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import Layout from "../components/Layout";


const router = createBrowserRouter([
    {
      path: "/",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      element: <Layout />,
      // loader: () => {
      //     if (!localStorage.getItem("access_token")) {
      //         return redirect('/')
      //     }
      //     return null;
      // },
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
      ]
  },
  ]);

export default router