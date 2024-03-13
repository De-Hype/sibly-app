import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import FriendRequest from "./pages/FriendRequest";
import CallLogs from "./pages/CallLogs";
import {Toaster} from "sonner";

function App() {
  return (
    <>
    <Toaster position="top-center" toastOptions={{
       unstyled:true,
      classNames:{
        error:"bg-red-400  text-white  px-4 py-2 rounded-xl flex items-center gap-2 ",
        success:"bg-green-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 ",
        info:"bg-blue-400  text-white   px-4 py-2 rounded-xl flex items-center gap-2 ",
        warning:"bg-yellow-400  text-white  px-4 py-2 rounded-xl flex items-center gap-2 " 
      }
    }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/chat/:id" exact element={<Chat />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/call-logs" exact element={<CallLogs />} />
          <Route path="/friend-request" exact element={<FriendRequest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
