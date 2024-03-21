import axios from "axios";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import unknownUser from "../assets/unknownUser.jpeg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { API } from "../utils/server";

const Profile = () => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const account = JSON.parse(localStorage.getItem("sibly_user"));
  const token = Cookies.get("sibly_user");
  const navigate = useNavigate();

  const handleUpdateAccount = async (data) => {

    try {
      const result = await axios.put(
        `${API}/user/update-user`,
        {
          email: data.email,
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success == "updated") {
        Cookies.set("sibly_user", result.data.token, { expires: 1 });
        localStorage.setItem("sibly_user", JSON.stringify(result.data.account));
        toast.success("You have succesfully updated your details")
      }
    } catch (err) {
      console.error(err);
      toast.error("Error occured trying to update account");
    }
  };
  const handleDeleteAccount = async () => {

    try {
      const result = await axios.delete(`${API}/user/delete-account/${account.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success == "deleted") {
        localStorage.clear("sibly_user");
        Cookies.remove("sibly_user");
        toast.success("Account deleted successfully");
        return navigate("/login");
      }
    } catch (err) {
      toast.info("Error occured while trying to delete users account");
      console.error(err);
    }
  };
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${API}/auth/sign-out`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.data.success == "out") {
        localStorage.clear("sibly_user");
        Cookies.remove("sibly_user");
        toast.info("User has logged out succesfully");
        return navigate("/login");
      }
    } catch (err) {
      toast.error("An error occured while logging out user, please retry");
      console.error(err);
    }
  };
  const handleFetchAccountDetails = async () => {
    try {
      const result = await axios.post(
        `${API}/user/my-details`,
        {
          email: account.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success == "found") {
        setEmail(result.data.users.email);
        setUsername(result.data.users.username);
      }
    } catch (err) {
      console.error(err);
      toast.info("An error occured while fetching the user details");
    }
  };
  const ChangeUserImage = ()=>{
    toast.info("Update profile picture feature is coming soon")
  }
  useEffect(() => {
    handleFetchAccountDetails();
  }, []);

  return (
    <div className="h-screen">
      <Header />
      <div className="h-4/5 w-full flex items-center justify-center">
        <div className=" flex  flex-col w-1/2 tab:w-full ">
          <form
            onSubmit={handleSubmit(handleUpdateAccount)}
            className="flex gap-3 flex-col items-center w-full"
          >
            <img
            onClick={ChangeUserImage}
              className="rounded-full bg-red-500 h-14 w-14"
              src={unknownUser}
              alt="A profile image of the zenchat chat application user, David Hype ."
            />
            <div className="w-full">
              <input
                type="email"
                name="email"
                placeholder="New Email"
                id="email"
                defaultValue={email}
                {...register("email", {
                  required: "Email is required",
                })}
                className={`text-sm w-full outline-none rounded-xl border px-3 py-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm text-left  font-semibold ">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                {...register("username", {
                  required: "Username is required",
                  validate: (value) => {
                    if (value.length < 7) {
                      return "Username must be atleast seven characters";
                    }
                  },
                })}
                defaultValue={username}
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
                {...register("confirmPassword", {
                  required: "Password is required",
                  validate: (value) => {
                    //We will also add for special characters soo
                    if (value.length < 6) {
                      return "Password must be atleast six characters";
                    }
                    if (value !== password) {
                      return "Does not match with passwords ";
                    }
                  },
                })}
                type="password"
                name="confirmPassword"
                className={`text-sm w-full outline-none rounded-xl border px-3 py-2 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                placeholder="Confirm Password"
                id="confirmPassword"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm text-left  font-semibold  ">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <input
              onClick={handleSubmit(handleUpdateAccount)}
              type="submit"
              className="cursor-pointer text-sm outline-none  w-full py-2 text-white bg-blue-500 transition hover:bg-blue-300 rounded-xl"
              value="Update Details"
            />
          </form>
          <div className="flex justify-between items-center mt-3 ">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="bg-red-300 text-red-700 px-2 rounded-lg"
            >
              Delete account
            </button>
            <button
              type="button"
              onClick={handleLogOut}
              className="bg-blue-300 text-blue-700 px-2 rounded-lg"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
