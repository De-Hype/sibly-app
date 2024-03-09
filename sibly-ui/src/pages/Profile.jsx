import axios from "axios";

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import unknownUser from "../assets/unknownUser.jpeg";

const Profile = () => {
  const handleUpdateAccount = async (e)=>{
    e.preventDefault();
    try {
    
    } catch (error) {
      console.error(error)
    }
  }
  const handleDeleteAccount = async ()=>{
    try {
      
    } catch (error) {
      console.error(error)
    }
  }
  const handleLogOut = async ()=>{
    try {
      
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="h-screen">
      <Header />
      <div className="h-4/5 w-full flex items-center justify-center">
        <div className=" flex flex-col w-1/2 tab:w-full ">
          <form onSubmit={handleUpdateAccount} className="flex gap-3 flex-col items-center w-full">
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
            <button type="button" onClick={handleDeleteAccount} className="bg-red-300 text-red-700 px-2 rounded-lg">Delete account</button>
            <button type="button" onClick={handleLogOut} className="bg-blue-300 text-blue-700 px-2 rounded-lg">Log out</button>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Profile;
