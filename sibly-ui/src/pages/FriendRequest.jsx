import { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import unknownUser from "../assets/unknownUser.jpeg";
import { FaSearch, FaUserCheck } from "react-icons/fa";
import { IoPersonAdd, IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { selectUser } from "../redux/chatSlice";
import { useDispatch } from "react-redux";
import { API } from "../utils/server";
import { toast } from "sonner";
import axios from "axios";

const FriendRequest = () => {
  const [search, setSearch] = useState("");
  const [nonFriendUsers, setNonFriendUsers] = useState(null);
  const [FriendRequestGotten, setFriendRequestGotten] = useState(null);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get("sibly_user");
  const handleNonFriendSearch = (e) => {
    e.preventDefault();
    console.log(search);
  };
  const handleSendFriendRequest = async (id) => {
    try {
      const result = await axios.get(
        `${API}/friend/send-friend-request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (result.data.success == "sent") {
        //setEmail(result.data.users.email);
        toast.success("Friend request sent succesfully");
        setShowChatIcon(true);
      }
    } catch (err) {
      console.error(err);
      setShowChatIcon(false);
      toast.info("An error occured while sending friend request");
    }
  };
  const handleAcceptFriendRequest = async (id) => {
    try {
      const result = await axios.get(
        `${API}/friend/accept-friend-request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      if (result.data.success == "added") {
        //setEmail(result.data.users.email);
        toast.success("Friend request accepted succesfully");
        setShowChatIcon(true);
      }
    } catch (err) {
      console.error(err);
      setShowChatIcon(false);
      toast.info("An error occured while accepting friend request");
    }
  };

  const handleUserClick = (users) => {
    dispatch(selectUser(users));
    navigate("/chat");
  };

  useEffect(() => {
    //Here, we will fetch for users that are not on my friend list.
    const FetchNonFriends = async () => {
      try {
        const result = await axios.get(
          `${API}/user/fetch-non-friends`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.data.success == "fetched") {
          //setEmail(result.data.users.email);
          setNonFriendUsers(result.data.nonFriends);
        }
      } catch (err) {
        console.error(err);
        toast.info("An error occured while fetching the users");
      }
    };
    FetchNonFriends();

    const FetchFriendRequestGotten = async () => {
      try {
        const result = await axios.get(
          `${API}/friend/get-received-request`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result.data)
        if (result.data.success == "fetched") {
          //setEmail(result.data.users.email);
          setFriendRequestGotten(result.data.requestGotten);
          //setNonFriendUsers(result.data.nonFriends);
        }
      } catch (err) {
        console.error(err);
        toast.info("An error occured while fetching friend request received");
      }
    };
    FetchFriendRequestGotten();
  }, [token]);

  return (
    <div className="h-screen ">
      <Header />
      <section className="h-full my-3  py-2 px-4 sm:px-1  flex justify-center items-center gap-3">
        <div className="flex flex-col h-full gap-3 w-3/4 sm:w-full">
          <section className="h-full  overflow-y-auto border self-start flex flex-col gap-3 px-3 w-full  py-3 shadow">
            <aside className="w-full ">
              <h3 className="text-center font-bold text-lg">
                Accept Friend Request
              </h3>
            </aside>
              {FriendRequestGotten?.length > 0 ? (
             
                
            <aside className="w-full ">
                  {FriendRequestGotten?.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between transition px-2 py-2 border-b hover:shadow"
                    >
                      <div className="flex items-center gap-1">
                        <img
                          className="rounded-full h-14 w-14"
                          src={user?.profilePic || unknownUser}
                          alt="A profile image of the zenchat chat application user, David Hype ."
                        />
                        <div className="flex flex-col gap-1">
                          <h3 className="font-bold text-sm">{user?.name}</h3>
                          <p className="text-xs font-">{user?.username}</p>
                        </div>
                      </div>
                      {showChatIcon ? (
                        <>
                          <IoChatbubbleEllipsesSharp
                            onClick={() => handleUserClick(user)}
                            className="text-blue-800 text-2xl cursor-pointer font-bold"
                          />
                        </>
                      ) : (
                        <FaUserCheck
                          onClick={() => handleAcceptFriendRequest(user._id)}
                          className="text-blue-800 text-2xl cursor-pointer font-bold"
                        />
                      )}
                    </div>
                  ))}
                
            </aside>
          
              ) : (
                <div className="h-1/2 flex items-center justify-center">
                  <div className="">
                    <h3>No Friend Request Received</h3>
                  </div>
                </div>
              )}
          </section>
          <section className="h-full overflow-y-auto border self-start flex flex-col gap-3 px-3 w-full  py-2 shadow">
            <form
              onSubmit={handleNonFriendSearch}
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
                onClick={handleNonFriendSearch}
              />
            </form>
            {nonFriendUsers?.length > 0 ? 
            <aside className="w-full h-full">
              {nonFriendUsers?.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between transition px-2 py-2 border-b hover:shadow"
                >
                  <div className="flex items-center gap-1">
                    <img
                      className="rounded-full h-14 w-14"
                      src={user?.profilePic || unknownUser}
                      alt="A profile image of the zenchat chat application user, David Hype ."
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-sm">{user?.name}</h3>
                      <p className="text-xs font-">{user?.username}</p>
                    </div>
                  </div>
                  {showChatIcon ? (
                    <>
                      <IoChatbubbleEllipsesSharp
                        onClick={() => handleUserClick(user)}
                        className="text-blue-800 text-2xl cursor-pointer font-bold"
                      />
                    </>
                  ) : (
                    <IoPersonAdd
                      onClick={() => handleSendFriendRequest(user._id)}
                      className="text-blue-800 text-2xl cursor-pointer font-bold"
                    />
                  )}
                </div>
              ))} 
                    </aside>
              : <div className="h-1/2 flex items-center justify-center">
                  <div className="">
                    <h3>Lol...everybody is your friend</h3>
                  </div>
                </div>
              }
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FriendRequest;
