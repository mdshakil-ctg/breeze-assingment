import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Registers/Registers';
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {path: '/',
    element: <Register></Register>},
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>
    },
    {
      path: '/login',
      element: <Login></Login>
    },
  ]
)

function App(children) {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "white",
            background: "#4406CB",
          },
        }}
      ></Toaster>
     <RouterProvider router={router}>{children}</RouterProvider>
    </div>
  );
}

export default App;
