import logo from './logo.svg';
import './App.css';
import Employees from './components/Employees/Employees';
import Allocation from './components/Allocation/Allocation';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
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
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/Employees",
    element: <Employees />,
  },
  {
    path: "/Allocation",
    element: <Allocation />,
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
