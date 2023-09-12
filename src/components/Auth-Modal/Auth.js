import useInput from "./use-input";
import { Link, useSearchParams } from "react-router-dom";
import classes from "./Auth.module.css";

import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setAdminStatus, resetAdminStatus } from './action';

import Profile from "./Profile";


function Auth() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.isAdmin);


  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim(""));

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim(""));

  const [errorMessage, setErrorMessage] = useState("");

  const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsSignedIn(true);
      const storedName = localStorage.getItem("enteredName");
      if (storedName) {
        nameChangedHandler(storedName);
      }
    }
  }, [nameChangedHandler]);

  const signInHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        const isAdminUser = userCredential.user.email === "admin@admin.com";
        dispatch(setAdminStatus(isAdminUser));
        const token = userCredential.user.accessToken;
        localStorage.setItem("token", token);
        setIsSignedIn(true);
        resetNameInput();
        resetEmailInput();
        resetPasswordInput();
      })

      .catch((error) => {
        setErrorMessage("Invalid email or password.");

        // Clear the error message after 3000 milliseconds (3 seconds)
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });

    fetch("https://project-2-c70d6-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let targetName = null;
        for (const key in data) {
          if (data[key].email === enteredEmail) {
            targetName = data[key].name;
            break;
          }
        }
        setUserName(targetName)
        console.log(targetName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.log(user);
  const signUpHandler = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      console.log(userCredential);

      const forDataStorage = {
        name: enteredName,
        email: enteredEmail,
      };

      const response = await fetch(
        "https://project-2-c70d6-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          body: JSON.stringify(forDataStorage),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to store user data.");
      }

      const data = await response.json();
      console.log(data);
      const token = userCredential.user.accessToken;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", enteredName);
      setIsSignedIn(true);
      resetNameInput();
      resetEmailInput();
      resetPasswordInput();
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        setErrorMessage("Invalid email or password.");
      } else if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already in use by another user.");
      } else {
        setErrorMessage("Failed to create user.");
      }
      console.error(error);

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  console.log(isAdmin);


  const handleLogout = () => {

    setIsSignedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    dispatch(resetAdminStatus());
  };


  if (isSignedIn) {
    return <>
      <Profile userNameFromEmail={userName} />
      <button onClick={handleLogout}>Logout</button>
    </>;
  }

  return (
    <>
      {isLogin && (
        <form onSubmit={signInHandler} className={classes.form}>
          <div className={classes.singIn}>
          <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
            <label className={emailInputClasses}>
              <p>Email</p>
              <input
                type="email"
                id="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                onFocus={() => setErrorMessage("")} // Clear error on focus
                value={enteredEmail}
              />
              {emailInputHasError && (
                <p className={classes.error}>Please enter a valid email.</p>
              )}
            </label>
            <label>
              <p>Password</p>
              <input
                type="password"
                id="password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
              />
              {passwordInputHasError && (
                <p className={classes.error}>Please enter a valid password.</p>
              )}
            </label>
            <div>
              <button disabled={!formIsValid} className={classes.btn}>Submit</button>
            </div>

            <div style={{marginTop: '10px'}}>
              <Link
                className={classes.link}
                to={`?mode=${isLogin ? "signup" : "login"}`}
              >
                {isLogin ? "Sign Up" : "Login"}
              </Link>
            </div>
          </div>
        </form>
      )}

      {!isLogin && (
        <form onSubmit={formSubmissionHandler && signUpHandler}>
          <div className={classes.singIn}>
          <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
            <label className={nameInputClasses}>
              <p>Name</p>
              <input
                type="text"
                id="name"
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                onFocus={() => setErrorMessage("")} // Clear error on focus
                value={enteredName}
              />
              {nameInputHasError && (
                <p className={classes.error}>Please enter a valid name.</p>
              )}
            </label>
            <label className={emailInputClasses}>
              <p>Email</p>
              <input
                type="email"
                id="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                onFocus={() => setErrorMessage("")} // Clear error on focus
                value={enteredEmail}
              />
              {emailInputHasError && (
                <p className={classes.error}>Please enter a valid email.</p>
              )}
            </label>
            <label>
              <p>Password</p>
              <input
                type="password"
                id="password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
              />
              {passwordInputHasError && (
                <p className={classes.error}>Please enter a valid password.</p>
              )}
            </label>
            <div>
              <button disabled={!formIsValid} className={classes.btn}>Submit</button>
            </div>

            <div style={{marginTop: '10px'}}>
              <Link
                className={classes.link}
                to={`?mode=${isLogin ? "signup" : "login"}`}
              >
                {isLogin ? "Sign Up" : "Login"}
              </Link>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Auth;
