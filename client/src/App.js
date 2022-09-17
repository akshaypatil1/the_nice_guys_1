import logo from './logo.svg';
import './App.css';
import Employees from './components/Employees/Employees';
import Login from './components/Login/Login';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Employees",
    element: <Employees />,
  },
  {
    path: "/home",
    element: <Employees />,
  },
]);

function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
