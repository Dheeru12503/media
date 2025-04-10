import axios from "axios";
import React, { useState } from "react";
import "./signup.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
const SignUp = () => {
  const navigate = useNavigate();
  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const confirmPassword = useRef();
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleOnsubmit = (e) => {
    e.preventDefault();
    const name = userName.current.value;
    const email = userEmail.current.value;
    const password = userPassword.current.value;
    const confPassword = confirmPassword.current.value;

    if (password !== confPassword) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) {
      formData.append("profileImage", profilePic);
    }

    axios
      .post(`http://localhost:3000/api/v1/SignUp`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/SignIn");
      })
      .catch((err) => {
        console.log(err);
      });

    userName.current.value = "";
    userEmail.current.value = "";
    userPassword.current.value = "";
    confirmPassword.current.value = "";
    setProfilePic(null);
    setPreview(null);
  };
  return (
    <>
      <form className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="card custom-card">
              <div className="card-header text-center">
                <h3>Sign Up</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group my-3 d-flex justify-content-center ">
                    <label htmlFor="profilePic" className="profile-pic-label">
                      <div className="profile-pic-wrapper">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Profile Preview"
                            className="profile-pic"
                          />
                        ) : (
                          <div className="plus-icon-wrapper">
                            <CgProfile className="profile-icon" />
                          </div>
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      id="profilePic"
                      className="form-control d-none"
                      onChange={handleProfilePicChange}
                      accept="image/*"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input
                      type="text"
                      ref={userName}
                      className="form-control my-2"
                      id="inputName"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input
                      type="email"
                      ref={userEmail}
                      className="form-control my-2"
                      id="inputEmail"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                      type="password"
                      ref={userPassword}
                      className="form-control my-2"
                      id="inputPassword"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="inputConfirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      ref={confirmPassword}
                      className="form-control my-2"
                      id="inputConfirmPassword"
                      placeholder="Confirm your password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block my-2 w-100"
                    onClick={handleOnsubmit}
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
