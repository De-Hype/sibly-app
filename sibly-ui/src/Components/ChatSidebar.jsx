
import unknownUser from "../assets/unknownUser.jpeg";

import { GoDotFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";

const ChatSidebar = () => {
  return (
    <section className="w-3/4 h-full flex flex-col gap-2">
      <aside className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="rounded-full h-14 w-14"
            src={unknownUser}
            alt="A profile image of the zenchat chat application user, David Hype ."
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold cursor-auto">David Hype</h3>
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
      <aside className="h-2/3 overflow-y-auto bg-blue-400"></aside>
      <aside className="self-end relative px-4 shadow-sm py-3 w-full border flex items-center rounded-2xl">
        <span className=" cursor-pointer absolute transition hover:bg-white hover:border  hover:border-blue-600 rounded-full px-3 py-3 left-2 bg-blue-700">
          <FaPlus className="text-white transition hover:text-blue-700" />
        </span>
        <textarea
          className="w-full font-semibold text-sm px-11 py-1 min-h-20 outline-none resize-none"
          name=""
          id=""
          placeholder="Send message..."
        ></textarea>
        <span className="cursor-pointer transition hover:bg-white hover:border hover:border-blue-600 absolute rounded-full px-3 py-3  right-2 bg-blue-700">
          <IoSend className="text-white transition hover:text-blue-700" />
        </span>
      </aside>
    </section>
  );
};

export default ChatSidebar;
