import { useState, useEffect } from "react";

import unknownUser from "../assets/unknownUser.jpeg";
import { FaSearch } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { Data } from "../pages/Data";
import { selectUser } from "../redux/chatSlice";
import { API } from "../utils/server";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";


const UserSideBar = () => {
  const [search, setSearch] = useState("");
  const [FriendList, setFriendList] = useState(null);

  const dispatch = useDispatch();
  let show = useSelector((state) => state.action.showFriends);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const onlineUsers = useSelector((state) => state.chat.onlineUsersList);

  const width = window.innerWidth;
  const token = Cookies.get("sibly_user");

  const handleFriendSearch = (e) => {
    e.preventDefault();
    console.log(search);
  };
  if (width > 840) {
    show = true;
  }

  const handleUserClick = (users) => {
    dispatch(selectUser(users));
  };

  useEffect(() => {
    //Here, we will fetch for users that are not on my friend list.
    const FetchFriendList = async () => {
      try {
        const result = await axios.get(
          `${API}/user/single-user`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (result.data.success == "fetched") {
          //setEmail(result.data.users.email);
          setFriendList(result.data.user.friends);
        }
      } catch (err) {
        console.error(err);
        toast.info("An error occured while fetching the users");
      }
    };
    FetchFriendList();
    console.log(FriendList);
  }, []);

  return (
    <section
      className={
        show
          ? "h-full overflow-y-auto border self-start flex flex-col gap-3 px-3 tab:px-1 w-1/4 tab:w-full py-2 shadow"
          : "hidden"
      }
    >
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
        <FaSearch
          className="absolute right-3 cursor-pointer"
          onClick={handleFriendSearch}
        />
      </form>
      <aside className="">
        {FriendList?.map((users, index) => (
          <div
            key={index}
            onClick={() => handleUserClick(users)}
            className={`flex items-center justify-between transition px-2 cursor-pointer py-2 border-b hover:bg-slate-200 ${
              selectedUser && selectedUser._id == users._id
                ? "bg-slate-500"
                : "bg-white"
            }`}
          >
            <div className="flex items-center gap-1">
              <img
                className="rounded-full h-14 w-14"
                src={users?.image || unknownUser}
                alt={`A profile image of the zenchat chat application user, ${users.name} .`}
              />
              <div className="flex flex-col items-start gap-1">
                <h3 className="font-bold text-sm">{users.name}</h3>
                <p className="text-xs font-">{users.message}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              {onlineUsers.includes(users._id) && (
                <GoDotFill className="text-green-500 font-bold" />
              )}
              <p className="font-light text-xs self-end">{users.time}</p>
            </div>
          </div>
        ))}
      </aside>
    </section>
  );
};

export default UserSideBar;
