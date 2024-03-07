
import { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

import unknownUser from "../assets/unknownUser.jpeg";
import { FaSearch } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";

const FriendRequest = () => {
  const [search, setSearch] = useState("");

  //Search components
  //Messaged user components
  //For the messaged user, it will have this =>
  //image, {username, message}, activestatus
  const handleFriendAdd = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <div className="h-screen ">
      <Header />
      <section className="h-3/4 my-3 py-2 px-4 sm:w-full sm:px-1  flex justify-center items-center gap-3">
        <section className="h-full overflow-y-auto border self-start flex flex-col gap-3 px-3 w-3/4 tab:w-full py-2 shadow">
          <form
            onSubmit={handleFriendAdd}
            className="border py-1 px-2 rounded relative flex items-center"
          >
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="search"
              id="search"
              placeholder="Add friend..."
              className="pl-3 pr-8 w-full py-2 outline-none text-sm"
            />
            <FaSearch
              className="absolute right-3 cursor-pointer"
              onClick={handleFriendAdd}
            />
          </form>
          <aside className="w-full">
            <div className="flex items-center justify-between transition px-2 py-2 border-b hover:shadow">
              <div className="flex items-center gap-1">
                <img
                  className="rounded-full h-14 w-14"
                  src={unknownUser}
                  alt="A profile image of the zenchat chat application user, David Hype ."
                />
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-sm">David Hype</h3>
                  <p className="text-xs font-">#hype</p>
                </div>
              </div>
              <IoPersonAdd className="text-blue-800 text-2xl cursor-pointer font-bold" />
            </div>
          </aside>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default FriendRequest;
