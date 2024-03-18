import axios from "axios";

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import unknownUser from "../assets/unknownUser.jpeg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { API } from "../utils/server";

const Profile = () => {
  const token = Cookies.get("sibly_user");
  const navigate = useNavigate();
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteAccount = async () => {
    try {
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${API}/auth/verify-login`, {headers:{
        Authorization:`Bearer ${token}`
      }});
     if (result.data.success == "out") {
        localStorage.removeItem("user");
        //Set to clear the token
        Cookies.remove("sibly_user")
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
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleFetchAccountDetails();

    return () => {};
  }, []);

  return (
    <div className="h-screen">
      <Header />
      <div className="h-4/5 w-full flex items-center justify-center">
        <div className=" flex  flex-col w-1/2 tab:w-full ">
          <form
            onSubmit={handleUpdateAccount}
            className="flex gap-3 flex-col items-center w-full"
          >
            <img
              className="rounded-full h-14 w-14"
              src={unknownUser}
              alt="A profile image of the zenchat chat application user, David Hype ."
            />
            <input
              type="email"
              name="email"
              placeholder="New Email"
              className="text-sm outline-none rounded-xl w-full border px-3 py-2"
              id="email"
            />
            <input
              type="text"
              name="username"
              placeholder="New Username"
              className="text-sm outline-none rounded-xl w-full border px-3 py-2"
              id="username"
            />
            <input
              type="password"
              name="password"
              placeholder="New password"
              className="text-sm outline-none rounded-xl w-full border px-3 py-2"
              id="password"
            />
            <input
              type="password"
              name="password"
              placeholder="Confirm New password"
              className="text-sm outline-none rounded-xl w-full  border px-3 py-2"
              id="confirm-password"
            />
            <input
              onClick={handleUpdateAccount}
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
