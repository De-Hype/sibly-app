import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
  const user = localStorage.getItem("user");
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
          <Route path="/" exact element={user ? <Navigate to="/chat" /> : <LandingPage />  } />
          <Route path="/login" exact element={user ? <Navigate to="/chat" /> : <Login />} />
          <Route path="/register" exact element={user ? <Navigate to="/chat" /> : <Register />} />

          <Route path="/chat" exact element={user ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/profile" exact element={ user ? <Profile />  : <Navigate to="/login"/>} />
          <Route path="/call-logs" exact element={ user ? <CallLogs />  : <Navigate to="/login"/>} />
          <Route path="/friend-request" exact element={ user ? <FriendRequest />  : <Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
