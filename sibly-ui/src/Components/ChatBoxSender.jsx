
const ChatBoxSender = ({message, time}) => {
  return (
    <div className="flex mb-2 flex-col items-start justify-start border border-blue-500  text-blue-900 rounded-lg px-3 py-1">
      <p className="text-base">{message}</p>
      <p className="text-xs">{time}</p>
    </div>
  )
}

export default ChatBoxSender