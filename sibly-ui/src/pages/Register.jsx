
import { SiBitly } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { API } from "../utils/server";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await axios.post(`${API}/auth/register`, {
        name:data.name, username:data.username, email:data.email, password:data.password
      });
      
      if (result.data.success == "created") {
        toast.success("Account created succesfully");
        return navigate("/login");
      }
    } catch (err) {
      if (err.response.status == 400) {
        return toast.error("User already exist");
      }
      
      if (err.response.status == 405) {
        return toast.error("Invalid registration details")
      }
      if (err.response.status == 429) {
        return toast.info("Too many request, please try again later")
      }

      toast.warning("An error occured while registering user, please retry");
      console.error(err);
    }
  };
  
  const GoogleOauthLogin =()=>{
    toast.info("Google Oauth is coming soon")
  }
  const GithubOauthLogin =()=>{
    toast.info("Github Oauth is coming soon")
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex  py-3 px-4 tab:px-1 items-center justify-center flex-col gap-2 w-1/2 tab:w-full  sm:w-full ">
        <SiBitly className="text-5xl" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-2"
        >
          <div className="w-full ">
            <input
              {...register("name", {
                required: "Name is required",
                validate: (value) => {
                  //We will also add for special characters soo
                  if (value.length < 4) {
                    return "Name must be atleast 4 characters";
                  }
                },
              })}
              defaultValue=""
              type="text"
              name="name"
              className={`text-sm w-full outline-none rounded-xl border px-3 py-2 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Name"
              id="name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm text-left  font-semibold ">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              {...register("username", {
                required: "Username is required",
                validate: (value) => {
                  //We will also add for special characters soo
                  if (value.length < 7) {
                    return "Username must be atleast seven characters";
                  }
                },
              })}
              defaultValue=""
              type="text"
              name="username"
              className={`text-sm w-full outline-none rounded-xl border px-3 py-2 ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Username"
              id="username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm text-left  font-semibold ">
                {errors.username.message}
              </p>
            )}
          </div>
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
          <div className="w-full">
            <input
              type="submit"
              value="Register"
              className="cursor-pointer w-full text-sm outline-none py-2 text-white bg-blue-500 transition hover:bg-blue-300 rounded-xl"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
        <div className="flex gap-3 pt-5 flex-col w-full">
          <button
            className="text-sm outline-none cursor-pointer py-2 bg-blue-500 rounded-xl text-white hover:bg-blue-300 transition"
            type="button"
            onclick={GoogleOauthLogin}
          >
            Register with Google
          </button>
          <button
            className="text-sm outline-none cursor-pointer py-2 bg-black rounded-xl text-white hover:bg-slate-700 transition"
            type="button"
            onclick={GithubOauthLogin}
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
