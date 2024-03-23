import { FaUserFriends } from "react-icons/fa";
import { SiBitly } from "react-icons/si";
import {  IoMdSettings } from "react-icons/io";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-2 px-4 tab:px-1 border-b">
      <SiBitly className="text-5xl cursor-pointer" />
      <div className="flex items-center gap-5">
        <Link
          className="text-black transition hover:text-blue-700"
          to="/friend-request"
        >
          <FaUserFriends className="text-2xl" />
        </Link>
        <Link
          className="text-black transition hover:text-blue-700"
          to="/chat"
        >
          <BsChatSquareQuoteFill className="text-2xl" />
        </Link>
        <Link
          className="text-black transition hover:text-blue-700"
          to="/call-logs"
        >
          <IoCall className="text-2xl" />
        </Link>
        <Link
          className="text-black transition hover:text-blue-700"
        to="/profile"
        >
          <IoMdSettings className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
