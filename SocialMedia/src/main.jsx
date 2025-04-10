import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreatePost from "./components/CreatePost.jsx";
import PostList from "./components/PostList.jsx";
import SignIn from "./components/signin.jsx";
import SignUp from "./components/signup.jsx";
import Authent from "../layouts/Authent.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Authent>
            <PostList />
          </Authent>
        ),
      },
      {
        path: "/createpost",
        element: <CreatePost />,
      },
      { path: "/SignIn", element: <SignIn /> },
      { path: "/SignUp", element: <SignUp /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
