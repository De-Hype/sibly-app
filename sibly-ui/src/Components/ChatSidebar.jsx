import unknownUser from "../assets/unknownUser.jpeg";

import { GoDotFill } from "react-icons/go";

import { IoCall } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import ChatBoxes from "./ChatBoxes";
import ChatBoxSender from "./ChatBoxSender";
// import { useState, useEffect } from "react";
// import { setMessageInput, setOnlineUsers } from "../redux/chatSlice";
// import io from "socket.io-client";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API } from "../utils/server";
import axios from "axios";
const ChatSidebar = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(null);
  let show = useSelector((state) => state.action.showFriends);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const onlineUsers = useSelector((state) => state.chat.onlineUsersList);

  const token = Cookies.get("sibly_user");
  // const dispatch = useDispatch();
  console.log(selectedUser);
  const width = window.innerWidth;

  if (width > 840) {
    show = false;
  }
  useEffect(() => {
    //Here, we will fetch the conversations of this users
    const FetchConversation = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${API}/chat/get-message/${selectedUser._id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (result.data.success == "fetched") {
          setMessages(result.data.messages)
          //setEmail(result.data.users.email);
          // setFriendList(result.data.user.friends);
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
        toast.info("An error occured while fetching the messages");
      }
    };
    FetchConversation()
  }, []);

  return (
    <section
      className={
        !show
          ? "w-3/4 tab:w-full h-full flex tab:overflow-y-hidden flex-col gap-2"
          : "hidden"
      }
    >
      <aside className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="rounded-full h-14 w-14"
            src={selectedUser.image || unknownUser}
            alt={`A profile image of the zenchat chat application user, ${selectedUser.name}.`}
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold cursor-auto">{selectedUser.name}</h3>
            <div className="flex  gap-1">
              <GoDotFill className="text-green-500 font-bold" />
              <p className="font-light text-xs self-end">Active now</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <IoCall className="text-2xl font-bold cursor-pointer transition hover:text-blue-700" />
          <SlOptionsVertical className="text-2xl font-bold cursor-pointer transition hover:text-blue-700" />
        </div>
      </aside>
      {loading ? (
        <p>Loading messages</p>
      ) : (
        <aside className="h-2/3 overflow-y-auto relative">
          {messages?.map((value, index) => {

          <ChatBoxSender key={index} message={value.messages} time={"11:26 AM"} />
          })}

        </aside>
      )}
      <MessageInput />
    </section>
  );
};

export default ChatSidebar;
