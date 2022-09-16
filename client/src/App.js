import logo from './logo.svg';
import './App.css';
import Employees from './components/Employees/Employees';
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
