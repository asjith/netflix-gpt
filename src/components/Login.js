import { useRef, useState } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const handleIsSignInUp = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSignInUp = () => {
    //validate the email and password entered
    const msg = validateForm(email.current.value, password.current.value);
    setErrorMsg(msg);

    if (msg) return;

    //if email password are valid
    if (!isSignIn) {
      //Sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: fullName.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMsg(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    } else {
      //Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    }
  };

  return (
    <div className="relative">
      <Header />
      <div className="absolute z-0 w-screen">
        <img
          className="brightness-50"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7968847f-3da9-44b3-8bbb-13a46579881f/web/IN-en-20250609-TRIFECTA-perspective_32b70b51-20d4-46db-8a1a-3d5428be5f0e_large.jpg"
          alt="background"
        />
      </div>
      <form className="absolute z-10 bg-black w-1/3 mx-auto my-32 right-0 left-0 text-white p-10 bg-opacity-75 rounded-md">
        <h1 className="my-5 font-bold text-3xl">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="my-3 p-3 w-full bg-black border border-gray-600 rounded-md"
            ref={fullName}
          ></input>
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="my-3 p-3 w-full bg-black border border-gray-600 rounded-md"
          ref={email}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="my-3 p-3 w-full bg-black border border-gray-600 rounded-md"
          ref={password}
        ></input>
        <p className="my-5 font-bold text-red-700">{errorMsg}</p>
        <button
          type="button"
          className="my-3 p-2 w-full bg-red-700 font-bold rounded-md"
          onClick={handleSignInUp}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-5 cursor-pointer" onClick={handleIsSignInUp}>
          {isSignIn
            ? "New to Netflix? Sign Up now"
            : "Already registered? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
