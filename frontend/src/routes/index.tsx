import AdminPage from "../features/home/Home";
import UserPage from "../features/user/User";

const routes = [
  { path: "/", element: <UserPage />, exact: true },
  { path: "/login", element: null },
  { path: "/test", element: <AdminPage /> },
];

export default routes;
