import { BiSolidMessageDetail } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { MdVideoCameraFront } from "react-icons/md";

const Features = () => {
  return (
    <section className="grid grid-cols-3 mt-9 tab:grid-cols-1 tab:gap-9 tab:py-4 gap-3 py-2 px-4">
      <aside className="flex flex-col gap-1 rounded-tr-3xl justify-end relative border  tab:py-6 py-4 px-4">
        <span className="cursor-pointer hover:bg-blue-900 absolute -top-5 left-12 border rounded-full bg-blue-700 px-2 py-2 flex items-center justify-center">
          <FaUserFriends className="  text-white" />
        </span>
        <h4 className="font-bold text-blue-800">Seamless Friend Connections</h4>
        <p className="text-sm ">
          Connect effortlessly with your friends and expand your social circle
          with our intuituve friend request feature. Build meaningful
          connections and stay connected with those matter most.
        </p>
      </aside>
      <aside className="flex flex-col gap-1 rounded-tr-3xl justify-end relative border tab:py-6  py-4 px-4">
        <span className="cursor-pointer hover:bg-blue-900 absolute -top-5 left-12 border rounded-full bg-blue-700 px-2 py-2 flex items-center justify-center">
          <MdVideoCameraFront className="  text-white" />
        </span>
        <h4 className="font-bold text-blue-800">Crystal-Clear Video Calls</h4>
        <p className="text-sm">
          Experience high-definition video calls with friends and family whether
          across the street or around the globe. Stay connected in real-time and
          share special moments with our seamless video call feature.
        </p>
      </aside>
      <aside className="flex flex-col gap-1 rounded-tr-3xl justify-end relative border tab:py-6  py-4 px-4">
      <span className="cursor-pointer hover:bg-blue-900 absolute -top-5 left-12 border rounded-full bg-blue-700 px-2 py-2 flex items-center justify-center">
        <BiSolidMessageDetail className="  text-white"/>
        </span>
        <h4 className="font-bold text-blue-800">Instant Messaging, Anytime, Anywhere</h4>
        <p className="text-sm">
          Keep the conversation going with our reliable and lightening-fast chat
          feature. Share messages, photos and videos instantly, ensuring you're
          always connected with your loved ones, no matter where life takes you.
        </p>
      </aside>
    </section>
  );
};

export default Features;
