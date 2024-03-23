
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
const ChatSidebar = () => {
  
  let show = useSelector((state) => state.action.showFriends);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  // const dispatch = useDispatch();
  console.log(selectedUser)
  const width = window.innerWidth;
  
  
  if (width>840){
    show = false
  }
  
  
  return (
    <section className={!show ? "w-3/4 tab:w-full h-full flex tab:overflow-y-hidden flex-col gap-2": "hidden"}>
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
      <aside className="h-2/3 overflow-y-auto relative">
        
        <ChatBoxSender message={"Yes, sure"} time={"11:26 AM"} />
        <ChatBoxSender message={"I am open to frontend, and backend roles involving Javascript and Typescript."} time={"11:26 AM"} />
        <ChatBoxes message={"Okay...will inform you when there is a vacancy in my company"} time={"11:26 AM"} />

       
      </aside>
      <MessageInput />
    </section> 

  );
};

export default ChatSidebar;
