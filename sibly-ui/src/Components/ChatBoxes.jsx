const ChatBoxes = ({message, time}) => {
  return (
    <div className="flex mb-2 flex-col items-end justify-end bg-blue-500  text-white rounded-lg px-3 py-1">
      <p className="text-base">{message}</p>
      <p className="text-xs">{time}</p>
    </div>
  );
};

export default ChatBoxes;
