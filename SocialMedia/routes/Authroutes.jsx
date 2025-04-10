import { useRoutes } from "react-router-dom";
import SignIn from "../src/components/signin";
import SignUp from "../src/components/signup";

const Authroutes = () => {
  let element = useRoutes([
    ({ path: "SignIn", element: <SignIn /> },
    { path: "/SignUp", element: <SignUp /> }),
  ]);
  return element;
};

export default Authroutes;
