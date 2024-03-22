
import unknownUser from "../assets/unknownUser.jpeg";

import { GoDotFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import ChatBoxes from "./ChatBoxes";
import ChatBoxSender from "./ChatBoxSender";
import { useState, useEffect } from "react";
import { setMessageInput, setOnlineUsers } from "../redux/chatSlice";
import io from "socket.io-client";
const ChatSidebar = () => {
  const [input, setInput] = useState("")
 
  let show = useSelector((state) => state.action.showFriends);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const dispatch = useDispatch();
  console.log(selectedUser)
  const width = window.innerWidth;
  const handleMessageSubmit =() =>{
    dispatch(setMessageInput(input))
  }
  
  if (width>840){
    show = false
  }
  const person = 10
  useEffect(() => {
    const socket = io("http://localhost:8080", {
      query:{
        userId:person,
      }
    });
     socket.on("connect", ()=>{
      console.log("Connected to the server")
     })
     socket.on("disconnect", ()=>{
      console.log("Disonnected from the server")
     })
     socket.on("newMessage", (message)=>{
      console.log(message)
     });
     socket.on("getOnlineUsers",(onlineUsers) =>{
      dispatch(setOnlineUsers(onlineUsers))
      console.log(onlineUsers)
     })

    return () => {
      socket.disconnect();
    };
  }, [person]);
  
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
      <form onSubmit={handleMessageSubmit} className="self-end relative px-4 shadow-sm py-3 w-full border flex items-center rounded-2xl">
        <span className=" cursor-pointer absolute transition hover:bg-white hover:border  hover:border-blue-600 rounded-full px-3 py-3 left-2 bg-blue-700">
          <FaPlus className="text-white transition hover:text-blue-700" />
        </span>
        <textarea
          className="w-full font-semibold text-sm px-11 py-1 min-h-20 outline-none resize-none"
          name=""
          id=""
          placeholder="Send message..."
          onChange={(e)=> {setInput(e.target.value)}}
        ></textarea>
        <span onClick={handleMessageSubmit} className="cursor-pointer transition hover:bg-white hover:border hover:border-blue-600 absolute rounded-full px-3 py-3  right-2 bg-blue-700">
          <IoSend className="text-white transition hover:text-blue-700" />
        </span>
      </form>
    </section> 

  );
};

export default ChatSidebar;
