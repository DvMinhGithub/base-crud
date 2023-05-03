import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import routes from "./routes";
import WithAuth from "./utils/auth";
import ProtectedComponents from "./utils/auth";

function App() {
  return (
    <Router>
      <ProtectedComponents>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </ProtectedComponents>
    </Router>
  );
}

export default App;
