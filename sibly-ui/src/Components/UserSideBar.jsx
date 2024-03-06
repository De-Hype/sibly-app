
import { useState } from "react";

import unknownUser from "../assets/unknownUser.jpeg";
import { FaSearch } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const UserSideBar = () => {
  const [search, setSearch] = useState("");

  //Search components
  //Messaged user components
  //For the messaged user, it will have this =>
  //img, {username, message}, activestatus
  const handleFriendSearch = (e) => {
    e.preventDefault();
    console.log(search);
  };
  return (
    <section className="h-full overflow-y-auto border self-start flex flex-col gap-3 px-3 w-1/4 py-2 shadow">
      <form
        onSubmit={handleFriendSearch}
        className="border py-1 px-2 rounded relative flex items-center"
      >
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          id="search"
          placeholder="Search friend..."
          className="pl-3 pr-8 w-full py-2 outline-none text-sm"
        />
        <FaSearch className="absolute right-3 cursor-pointer" onClick={handleFriendSearch} />
      </form>
      <aside className="">
      <div className="flex items-center justify-between transition px-2 cursor-pointer py-2 border-b hover:bg-slate-200">
          <div className="flex items-center gap-1">
            <img
              className="rounded-full h-14 w-14"
              src={unknownUser}
              alt="A profile image of the zenchat chat application user, David Hype ."
            />
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-sm">My Sunlight</h3>
              <p className="text-xs font-">I love you...</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <GoDotFill className="text-green-500 font-bold" />
            <p className="font-light text-xs self-end">10:40 AM</p>
          </div>
        </div>
        <div className="flex items-center justify-between transition px-2 cursor-pointer py-2 border-b hover:bg-slate-200">
          <div className="flex items-center gap-1">
            <img
              className="rounded-full h-14 w-14"
              src={unknownUser}
              alt="A profile image of the zenchat chat application user, David Hype ."
            />
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-sm">Sufficient White</h3>
              <p className="text-xs font-">This is the last...</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <GoDotFill className="text-green-500 font-bold" />
            <p className="font-light text-xs self-end">10:40 AM</p>
          </div>
        </div>
        <div className="flex items-center justify-between transition px-2 cursor-pointer py-2 border-b hover:bg-slate-200">
          <div className="flex items-center gap-1">
            <img
              className="rounded-full h-14 w-14"
              src={unknownUser}
              alt="A profile image of the zenchat chat application user, David Hype ."
            />
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-sm">David Hype</h3>
              <p className="text-xs font-">Bring jobs.</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <GoDotFill className="text-green-500 font-bold" />
            <p className="font-light text-xs self-end">10:40 AM</p>
          </div>
        </div>


      </aside>
    </section>
  );
};

export default UserSideBar;
