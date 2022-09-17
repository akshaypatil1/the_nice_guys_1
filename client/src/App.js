import logo from './logo.svg';
import './App.css';
import Employees from './components/Employees/Employees';
import Home from './components/Home/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Employees />,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/Employees",
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
