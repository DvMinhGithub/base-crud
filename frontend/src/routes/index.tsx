import LayoutPage from "../components/layouts";
import LoginForm from "../features/auth/Login.page";

const routes = [
  { path: "/login", element: <LoginForm /> },
  { path: "/", element: <LayoutPage /> },
];

export default routes;
