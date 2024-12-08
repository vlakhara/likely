import React, { useEffect, useState } from "react";
import Google from "../assets/svgs/Google";
import {
  handleGoogleAuth,
  handleSignIn,
  handleSignUp,
  isUserNameTaken,
} from "../utils/functions";
import { Navigate } from "react-router-dom";

const initialCredentialsState: {
  username: string;
  password: string;
  email: string;
  displayName: string;
} = {
  username: "",
  password: "",
  email: "",
  displayName: "",
};

const Auth = () => {
  const [type, setType] = useState<"LOGIN" | "SIGNUP">("LOGIN");
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [isNotUserNameAvailable, setNotIsUserNameAvailable] =
    useState<boolean>(false);

  const [credentials, setCredentials] = useState(initialCredentialsState);

  const handleChangeView = () => {
    setType((prev) => (prev === "LOGIN" ? "SIGNUP" : "LOGIN"));
    setCredentials(initialCredentialsState);
  };

  const handleChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({ ...credentials, [type]: e.target.value });
    };

  useEffect(() => {
    let timer: any;
    if (type === "SIGNUP") {
      timer = setTimeout(async () => {
        setNotIsUserNameAvailable(
          (await isUserNameTaken(credentials.username)) || false
        );
      }, 200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [credentials.username, type]);

  const handleRegister = async () => {
    setLoading(true);
    await handleSignUp(credentials);
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    await handleSignIn(credentials);
    setLoading(false);
  };

  if (token) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="flex flex-col h-full relative justify-end">
      <img
        src={"./assets/image.png"}
        alt="logo"
        className="h-full w-full object-contain absolute bottom-[50px]"
      />
      <div
        className={`flex flex-col ${
          type === "LOGIN" ? "h-[400px]" : "h-[525px]"
        } bg-white rounded-t-[63px] overflow-hidden shadow-upper transition-all duration-2000 ease-in-out z-[1]`}
      >
        <div className="mb-1">
          <p className="text-black 500 mt-2 text-center text-[25px] font-bold first-letter:tracking-wider">
            Likely
          </p>
          <p className="text-indigo-950 text-center text-[15px] font-thin">
            Engage, Share, and Make It Likely.
          </p>
        </div>
        <div className="">
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={
              !loading
                ? type === "LOGIN"
                  ? handleLogin
                  : handleRegister
                : () => {}
            }
            action="#"
          >
            <input
              type={"text"}
              value={credentials.displayName}
              placeholder="Display Name"
              className={`${
                type === "LOGIN" ? "hidden" : ""
              } px-4 mt-2 h-[45px] min-w-[250px] text-black tracking-wide border border-black focus:border-black rounded-[12px] outline-none transition-all duration-700 ease-in-out`}
              onChange={handleChange("displayName")}
              required={type === "SIGNUP"}
            />
            <input
              type="text"
              value={credentials.username}
              placeholder="Username"
              className={`px-4 mt-2 h-[45px] min-w-[250px] text-black tracking-wide border border-black focus:border-black rounded-[12px] outline-none`}
              onChange={handleChange("username")}
              required={type === "SIGNUP"}
            />
            {isNotUserNameAvailable && (
              <p className="text-red-500 text-[14px] ml-20">
                Username is already taken
              </p>
            )}
            <input
              type="email"
              value={credentials.email}
              placeholder="Email"
              className={`${
                type === "LOGIN" ? "hidden" : ""
              } px-4 mt-2 h-[45px] min-w-[250px] text-black tracking-wide border border-black focus:border-black rounded-[12px] outline-none transition-all duration-700 ease-in-out`}
              onChange={handleChange("email")}
              required={type === "SIGNUP"}
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              className="px-4 mt-2 h-[50px] min-w-[250px] text-black tracking-wide border border-black focus:border-black rounded-[12px] outline-none"
              onChange={handleChange("password")}
              required
            />
            <button
              type="submit"
              disabled={isNotUserNameAvailable || loading}
              className="disabled:bg-gray-400 px-4 mt-4 mb-1 h-[45px] min-w-[250px] bg-black hover:bg-white hover:text-black hover:border hover:border-black text-center tracking-wide rounded-[12px] outline-none transition-all"
            >
              {type === "LOGIN" ? "Login" : "Sign Up"}
            </button>
            <p
              className="text-indigo-950 hover:text-blue-800 text-right text-[15px] underline font-thin cursor-pointer"
              onClick={handleChangeView}
            >
              {type === "LOGIN" && "Don't have an account?"}
              {type === "SIGNUP" && "Already have an account?"}
            </p>
            <p className="text-indigo-950 text-center text-[15px] font-thin mt-2">
              Or
            </p>

            <button
              type="button"
              className={`flex items-center gap-4 bg-[#292929] mt-1 px-5 py-3 rounded-[26px]`}
              onClick={handleGoogleAuth}
            >
              <Google />
              <p className="text-white">Continue with Google</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
