
import { SiBitly } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { API } from "../utils/server";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) =>{
    try {
      const result = await axios.patch(`${API}/auth/sign-in`, {
        email:data.email, password:data.password
      });
     
      if (result.data.success == "logged") {
        localStorage.setItem("user", JSON.stringify(result.data.account));
        toast.success("User has logged in succesfully");
        setTimeout(() => {
          
          navigate("/chat");
        }, 3000);
      }
    } catch (err) {
      
      if (err.response.status == 404) {
        return toast.error("User does not exist")
      }
      if (err.response.status == 400) {
        return toast.error("Invalid login details")
      }
      if (err.response.status == 429) {
        return toast.info("Too many request, please try again later")
      }
      toast.warning("An error occured while logging in user, please retry");
    }
  }
  
  return (
    <div className="h-screen flex items-center  justify-center">
      <div className="flex  py-3 px-4 items-center justify-center flex-col gap-2 w-1/2 tab:w-full sm:w-full ">
        <SiBitly className="text-5xl" />
        <form  onSubmit={handleSubmit(onSubmit)} className="flex  flex-col w-full gap-2">
        <div className="w-full">
            <input
              {...register("email", {
                required: "Email is required",
              })}
              defaultValue=""
              type="text"
              name="email"
              className={`text-sm w-full outline-none rounded-xl border px-3 py-2 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Email Address"
              id="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm text-left  font-semibold ">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  //We will also add for special characters soo
                  if (value.length < 6) {
                    return "Password must be atleast six characters";
                  }
                },
              })}
              type="password"
              name="password"
              className={`text-sm w-full outline-none rounded-xl border px-3 py-2 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Password"
              id="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm text-left  font-semibold  ">
                {errors.password.message}
              </p>
            )}
          </div>
          <input
            type="submit"
            value="Log In"
            className="cursor-pointer text-sm outline-none py-2 text-white bg-blue-500 transition hover:bg-blue-300 rounded-xl"
            onClick={handleSubmit(onSubmit)}
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
