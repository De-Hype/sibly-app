
import {  useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { setMessageInput } from "../redux/chatSlice";
import useSendMessage from "../hooks/useSendMessage";
const MessageInput = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);
    const [input, setInput] = useState("")
    const dispatch = useDispatch();
    const {sendMessage} = useSendMessage()
    const handleMessageSubmit =async(e) =>{
        e.preventDefault();
        if(!input) return;
        dispatch(setMessageInput(input))
        await sendMessage(input, selectedUser._id)
      }
  return (
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
  )
}

export default MessageInput