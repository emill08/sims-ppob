import {
    createBrowserRouter,
    redirect
} from "react-router-dom";
import RegisterPage from "../views/RegisterPage";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import Layout from "../components/Layout";
import TopupPage from "../views/TopupPage";
import PaymentPage from "../views/PaymentPage";
import HistoryPage from "../views/HistoryPage";
import AccountPage from "../views/AccountPage";
import EditPage from "../views/EditPage";


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
      loader: () => {
          if (!localStorage.getItem("token")) {
              return redirect('/')
          }
          return null;
      },
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/topup",
          element: <TopupPage />,
        },
        {
          path: "/payment",
          element: <PaymentPage />,
        },
        {
          path: "/transaction",
          element: <HistoryPage />,
        },
        {
          path: "/akun",
          element: <AccountPage />,
        },
        {
          path: "/edit",
          element: <EditPage />,
        },
      ]
  },
  ]);

export default router