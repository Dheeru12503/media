import { useContext, useRef } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL, PostList } from "../store/post-list-store";
const SignIn = () => {
  const { profileImage, setprofileImage,isAuthenticated, setIsAuthenticated } =
    useContext(PostList);
  
  const navigate = useNavigate();
  const userEmail = useRef();
  const userPassword = useRef();
  const handleOnsubmit = (e) => {
    e.preventDefault();

    const email = userEmail.current.value;
    const password = userPassword.current.value;

    const userData = {
      email,
      password,
    };

    axios
      .post(
        `${apiURL}/signin`,
        userData
      )
      .then((res) => {
        console.log(res);
        // console.log(res.data.userId.profileImage);
        setprofileImage(res.data.userId.profileImage);
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <>
      <form className="SignIn">
        <div className="signinPart card">
          <h1 className="h3 mb-3 fw-normal text-center card-header py-3">
            Enter Your Detail
          </h1>
          <div className="card-body">
            <div className="form-floating my-2">
              <input
                type="email"
                ref={userEmail}
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                fdprocessedid="nktfsp"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                ref={userPassword}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                fdprocessedid="w453kc"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <button
              className="btn btn-primary w-100 py-2"
              type="submit"
              onClick={handleOnsubmit}
              fdprocessedid="1dfnat"
            >
              Log In
            </button>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignIn;
