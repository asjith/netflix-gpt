import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignInUp = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="relative">
      <Header />
      <div className="absolute z-0">
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
          ></input>
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="my-3 p-3 w-full bg-black border border-gray-600 rounded-md"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="my-3 p-3 w-full bg-black border border-gray-600 rounded-md"
        ></input>
        <button
          type="button"
          className="my-3 p-2 w-full bg-red-700 font-bold rounded-md"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-5 cursor-pointer" onClick={handleSignInUp}>
          {isSignIn
            ? "New to Netflix? Sign Up now"
            : "Already registered? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
