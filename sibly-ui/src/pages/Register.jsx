import { useState } from "react";
import { SiBitly } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { API } from "../utils/server";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const HandleRegister = async (e) => {
    e.preventDefault();
    console.log();
    try {
      const result = await axios.post(`${API}/auth/register`, {
        name, username, email, password
      });
      console.log(result)
      if (result.data.success == "created"){
         toast.success("Account created succesfully");
        return navigate("/login")
      } 
     
    } catch (err) {
      if (err.response.status == 400) {
        return toast.error("User already exist")
      }
     
      toast.warning("An error occured while registering user, please retry");
      console.error(err);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex  py-3 px-4 tab:px-1 items-center justify-center flex-col gap-2 w-1/2 tab:w-full  sm:w-full ">
        <SiBitly className="text-5xl" />
        <form onSubmit={HandleRegister} className="flex flex-col w-full gap-2">
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="text-sm outline-none rounded-xl border px-3 py-2"
            placeholder="Name"
            id=""
          />
          <input
            type="text"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            className="text-sm outline-none rounded-xl border px-3 py-2"
            placeholder="Username"
            id=""
          />
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm outline-none rounded-xl border px-3 py-2"
            placeholder="Email Address"
            id=""
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="text-sm outline-none rounded-xl border px-3 py-2"
            placeholder="Password"
            id=""
          />
          <input
            type="submit"
            value="Register"
            className="cursor-pointer text-sm outline-none py-2 text-white bg-blue-500 transition hover:bg-blue-300 rounded-xl"
            onClick={(e) => HandleRegister(e)}
          />
        </form>
        <div className="flex gap-3 pt-5 flex-col w-full">
          <button
            className="text-sm outline-none cursor-pointer py-2 bg-blue-500 rounded-xl text-white hover:bg-blue-300 transition"
            type="button"
          >
            Register with Google
          </button>
          <button
            className="text-sm outline-none cursor-pointer py-2 bg-black rounded-xl text-white hover:bg-slate-700 transition"
            type="button"
          >
            Register with Github
          </button>
        </div>
        <h3 className="">
          <span>Already have an account?</span>
          <Link
            className="text-blue-500 transition hover:text-red-500"
            to="/login"
          >
            login
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Register;
