import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Collection from "./Collection";
import ResMenu from "./ResMenu";
import CartPage from "./CartPage";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/restaurants",
      element: <Home />,
    },
    { path: "/restaurantMenu/:id", element: <ResMenu /> },
    { path: "/cart", element: <CartPage /> },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
