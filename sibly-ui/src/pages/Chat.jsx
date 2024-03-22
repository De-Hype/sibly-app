import ChatSidebar from "../Components/ChatSidebar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import UserSideBar from "../Components/UserSideBar";
import { TbFriends, TbFriendsOff } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { showFriendsDisplay, showFriendsHide } from "../redux/actionSlice";
import { useEffect, useState } from "react";
import NoUserSelected from "../Components/NoUserSelected";

const Chat = () => {
  
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const input = useSelector((state) => state.chat.messageInput);
  console.log(input);
  
  const show = useSelector((state) => state.action.showFriends);
  const dispatch = useDispatch();
  

  //Add Websocket

  return (
    <div className="h-screen w-full">
      <Header />
      <section className="h-3/4 tab:w-full tab:px-1 tab:overflow-y-auto my-3 py-2 px-4 flex tab:flex-col items-center gap-3">
        <section className="hidden w-full tab:flex justify-between items-center">
          {show ? (
            <p className="text-sm font-semibold">See friends</p>
          ) : (
            <p className="text-sm font-semibold">Hide friends</p>
          )}
          {show ? (
            <TbFriends
              className="cursor-pointer font-bold text-xl"
              onClick={() => dispatch(showFriendsHide())}
            />
          ) : (
            <TbFriendsOff
              className="cursor-pointer font-bold text-xl"
              onClick={() => dispatch(showFriendsDisplay())}
            />
          )}
        </section>

        <UserSideBar />
        {selectedUser == null || undefined ? (
          <NoUserSelected />
        ) : (
          <ChatSidebar />
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Chat;
