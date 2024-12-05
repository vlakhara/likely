import React, { useState } from "react";
import Google from "../assets/svgs/Google";

const Login = () => {
  const [type, setType] = useState<"LOGIN" | "SIGNUP">("LOGIN");
  const credentials = {
    username: "",
    password: "",
  };

  const handleCreateAccount = () => {
    setType((prev) => (prev === "LOGIN" ? "SIGNUP" : "LOGIN"));
  };
  return (
    <div className="h-full w-full bg-slate-500 flex flex-col">
      <div className="flex-grow"></div>
      <div
        className={`flex flex-col ${
          type === "LOGIN" ? "h-[450px]" : "h-[600px]"
        } bg-white rounded-t-[63px] overflow-hidden transition-all duration-2000 ease-in-out`}
      >
        <div className="flex-grow">
          <p className="text-black 500 mt-4 text-center text-[25px] font-bold first-letter:tracking-wider">
            Likely
          </p>
          <p className="text-indigo-950 text-center text-[15px] font-thin">
            Engage, Share, and Make It Likely.
          </p>
        </div>
        <div className="flex-grow mt-1">
          <form className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Username"
              className="px-4 my-2 h-[45px] min-w-[250px] text-black tracking-wide border border-black focus:border-black rounded-[12px] outline-none"
              onChange={(e) => (credentials.username = e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className={`${
                type === "LOGIN" ? "hidden" : ""
              } px-4 my-2 h-[45px] min-w-[250px] text-black tracking-wide border border-black focus:border-black rounded-[12px] outline-none transition-all duration-700 ease-in-out`}
              onChange={(e) => (credentials.username = e.target.value)}
            />
            <input
              type="date"
              placeholder="DOB"
              className={`${
                type === "LOGIN" ? "hidden" : ""
              } px-4 my-2 h-[45px] min-w-[250px] text-black tracking-wide border border-black focus:border-black rounded-[12px] outline-none transition-all duration-700 ease-in-out`}
              onChange={(e) => (credentials.username = e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 my-2 h-[50px] min-w-[250px] text-black tracking-wide border border-black focus:border-black rounded-[12px] outline-none"
              onChange={(e) => (credentials.password = e.target.value)}
            />
            <button className="px-4 mt-4 h-[45px] min-w-[250px] bg-black hover:bg-white hover:text-black hover:border hover:border-black text-center tracking-wide rounded-[12px] outline-none transition-all">
              {type === "LOGIN" ? "Login" : "Sign Up"}
            </button>
            <p
              className="text-indigo-950 hover:text-blue-800 text-right text-[15px] underline font-thin cursor-pointer"
              onClick={handleCreateAccount}
            >
              {type === "LOGIN" && "Don't have an account?"}
              {type === "SIGNUP" && "Already have an account?"}
            </p>
            <p className="text-indigo-950 text-center text-[15px] font-thin mt-2">
              Or
            </p>

            <button
              className={`flex items-center gap-4 bg-[#292929] mt-2 px-5 py-3 rounded-[26px]`}
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

export default Login;
