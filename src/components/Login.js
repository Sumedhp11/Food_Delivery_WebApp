import React, { useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { checkValidate } from "../utils/validate";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignSignUp = () => {
    const message = checkValidate(email.current.value, password.current.value);
    setErrorMessage(message);
    if (!isSignForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
        name.current.value
      )
        .then((userCredential) => {
          // Sign In
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "_" + errorMessage);
        });
    }
  };
  const postData = async (e) => {
    e.preventDefault();
  };

  const toggleSignIn = () => {
    setIsSignInForm(!isSignForm);
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email.current.value)
      .then(() => {
        // Password reset email sent!
        alert("Email sent!");
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div>
      <Header />

      <form
        className="w-full md:w-5/12 absolute p-12 bg-indigo-500 my-14 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-50"
        onSubmit={postData}
      >
        <h1 className="font-bold text-3xl py-4 text-black">
          {isSignForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full text-black"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full text-black"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full text-black"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-indigo-950 text-white w-full rounded-lg"
          onClick={handleSignSignUp}
        >
          {isSignForm ? "Sign In" : "SignUp"}
        </button>
        <p className="py-4 cursor-pointer" onClick={handleForgotPassword}>
          Forgot Password
        </p>
        <p className="py-4 cursor-pointer" onClick={toggleSignIn}>
          {isSignForm
            ? "New Here? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
