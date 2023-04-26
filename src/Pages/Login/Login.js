import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/solid";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [password, setPassword] = useState(true);
  const navigate = useNavigate();

  const eyeButton = (e) => {
    setPassword(!password);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          toast("Login Succesfull");
          navigate('/dashboard')
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
           navigate("/dashboard");
          toast("Login Succesfull");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              You have to login first to view the dashboard content.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="text"
                  className="input input-bordered focus:border-0 focus:input-error focus:bg-gray-100 focus:outline-offset-0 rounded-none"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type={password ? "password" : "text"}
                  className="input input-bordered relative focus:border-0 focus:input-error focus:bg-gray-100 focus:outline-offset-0 rounded-none"
                />
                <p
                  onClick={() => eyeButton()}
                  className="lebel-text absolute px-3 top-[164px] right-[30px] cursor-pointer"
                >
                  <EyeIcon className="w-4 h-4 text-gray-600"></EyeIcon>
                </p>
                <label className="label">
                  <p>
                    <small className="mr-1">Don't Have an Account ?</small>
                    <Link
                      to="/"
                      className="label-text-alt link link-hover font-bold"
                    >
                      Register Here
                    </Link>
                  </p>
                </label>
              </div>
              <div className="mt-0">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
              <div className=" mt-0">
                <button
                  onClick={googleSignIn}
                  className="btn btn-secondary btn-outline mt-2 w-full"
                >
                  Login with google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
