import { useSelector } from "react-redux";
import { MdWavingHand } from "react-icons/md";

const NoUserSelected = () => {
  let show = useSelector((state) => state.action.showFriends);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  console.log(selectedUser)
  
  const width = window.innerWidth;
  
  if (width>840){
    show = false
  }
  return (
    <div className={!show ? "w-3/4  py-3 tab:w-full h-full flex tab:overflow-y-hidden flex-col gap-2": "hidden"}>
      <p className="text-center text-base tab:text-sm sm:text-xs text-slate-700">Select a friend to start chatting</p>
    </div>
  )
}

export default NoUserSelected