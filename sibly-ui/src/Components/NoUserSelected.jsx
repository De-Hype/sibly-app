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
  const name = "David"
  return (
    <div className={!show ? "w-3/4  py-3 tab:w-full h-full flex tab:overflow-y-hidden flex-col gap-2": "hidden"}>
      <p className="text-center font-bold text-base tab:text-sm sm:text-xs text-slate-700">Hello {name}, select a friend to start chatting</p>
      <div className="h-full flex items-center justify-center ">
        <MdWavingHand className="text-9xl text-blue-500"/>
      </div>
    </div>
  )
}

export default NoUserSelected