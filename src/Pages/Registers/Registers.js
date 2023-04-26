import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { EyeIcon } from "@heroicons/react/24/solid";
import { GoogleAuthProvider } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";

import app from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [password, setPassword] = useState(true);
  const eyeButton = (e) => {
    setPassword(!password);
  };

  const handleSignUp = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        if (result.user.uid) {
          toast("User sign up succesfully");
        }
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("User Sign Up Succesfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form
        className="mt-12 flex flex-col justify-center items-center"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <h1 className="text-4xl mb-5 font-extrabold">Register Now</h1>
        <p className="mb-5 text-gray-500">
          You have to register first to create an user identity.
        </p>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", {
              required: "email is required",
              minLength: { value: 10, message: "min length is 10 for email" },
            })}
            placeholder={errors.email && "Email is Required"}
            type="text"
            className="input input-bordered w-full max-w-xs focus:border-0 focus:input-error focus:bg-gray-100 focus:outline-offset-0 rounded-none"
          />
        </div>

        <div className="form-control w-full relative max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
            <p
              onClick={() => eyeButton()}
              className="lebel-text px-3 absolute top-[48px] right-[0px] cursor-pointer"
            >
              <EyeIcon className="w-4 h-4 text-gray-600"></EyeIcon>
            </p>
          </label>
          <input
            type={password ? "password" : "text"}
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "minumum 8 characters or longer",
              },
            })}
            placeholder={errors.password && "Password is Required"}
            className="input input-bordered w-full max-w-xs focus:border-0 focus:input-error focus:bg-gray-100 focus:outline-offset-0 rounded-none"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full max-w-xs mt-10 mb-5"
        >
          Create Account
        </button>
        <div className="form-control w-full max-w-xs">
          <p className="text-center text-sm font-semibold">
            After register go to the
            <Link
              to="/login"
              className=" ml-1 label-text-alt link link-hover font-bold"
            >
              <button className="btn btn-outline btn-primary btn-xs">
                {" "}
                login page
              </button>
            </Link>
          </p>
          <div className="divider max-w-xs text-xs ">OR</div>
        </div>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-secondary btn-outline w-full max-w-xs"
      >
        Continue With Google
      </button>
    </>
  );
};

export default Register;
