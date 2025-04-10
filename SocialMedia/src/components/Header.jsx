import { useContext, useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PostList } from "../store/post-list-store";
const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(PostList);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token?.split(".").length == 3) {
      console.log("token is present");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      console.log("token is not present");
    }
  }, []);
  const handleOnSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(true);
    navigate("/SignIn");
  };
  return (
    <header className="p-3 text-bg-dark bg-gradient">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                About
              </a>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-light bg-gradient "
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          {isAuthenticated ? (
            <div className="text-end">
              <Link to="/SignIn" className="btn btn-outline-light me-2 ">
                Login
              </Link>
              <Link to="/SignUp" className="btn btn-warning">
                Sign Up
              </Link>
            </div>
          ) : (
            <NavDropdown
              title={
                <span className="d-flex align-items-center text-white">
                  <img
                    src="https://github.com/mdo.png"
                    alt=""
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                  <strong>name</strong>
                </span>
              }
              id="nav-dropdown"
              className="dropdown"
            >
              <NavDropdown.Item href="#">New project...</NavDropdown.Item>
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleOnSignOut}>
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
