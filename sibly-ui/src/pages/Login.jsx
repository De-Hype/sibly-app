import { useState } from "react";
import { SiBitly } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { API } from "../utils/server";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.patch(`${API}/auth/sign-in`, {
        email,
        password,
      });
     
      if (result.data.success == "logged") {
        toast.success("User has logged in succesfully");
        localStorage.setItem("user", JSON.stringify(result.data.account));
        return navigate("/chat/123");
      }
    } catch (err) {
      
      if (err.response.statusText == "Not Found") {
        return toast.error("User does not exist")
      }
      if (err.response.status == 400) {
        return toast.error("Invalid login details")
      }
      console.error(err);
      toast.warning("An error occured while logging in user, please retry");
    }
  };
  return (
    <div className="h-screen flex items-center  justify-center">
      <div className="flex  py-3 px-4 items-center justify-center flex-col gap-2 w-1/2 tab:w-full sm:w-full ">
        <SiBitly className="text-5xl" />
        <form onSubmit={HandleLogin} className="flex  flex-col w-full gap-2">
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="text-smd outline-none rounded-xl border px-3 py-2"
            placeholder="Email Address"
            id="email"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="text-smd outline-none rounded-xl border px-3 py-2"
            placeholder="Password"
            id="password"
          />
          <input
            type="submit"
            value="Log In"
            className="cursor-pointer text-sm outline-none py-2 text-white bg-blue-500 transition hover:bg-blue-300 rounded-xl"
            onClick={HandleLogin}
          />
        </form>
        <div className="flex gap-3 pt-5 flex-col w-full">
          <button
            className="text-sm outline-none cursor-pointer py-2 bg-blue-500 rounded-xl text-white hover:bg-blue-300 transition"
            type="button"
          >
            Log in with Google
          </button>
          <button
            className="text-sm outline-none cursor-pointer py-2 bg-black rounded-xl text-white hover:bg-slate-700 transition"
            type="button"
          >
            Log in with Github
          </button>
        </div>
        <h3 className="">
          <span>Don't have an account?</span>
          <Link
            className="text-blue-500 transition hover:text-red-500"
            to="/register"
          >
            register
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;
