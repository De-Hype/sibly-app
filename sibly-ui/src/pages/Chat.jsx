import ChatSidebar from "../Components/ChatSidebar"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import UserSideBar from "../Components/UserSideBar"


const Chat = () => {
    
  return (
    <div className="h-screen tab:min-h-screen">
        <Header />
        <section className="h-3/4 my-3 py-2 px-4 flex tab:flex-col items-center gap-3">
          <UserSideBar />
          <ChatSidebar />
        </section>
        <Footer />
    </div>
  )
}

export default Chat