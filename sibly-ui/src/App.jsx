import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/:id" exact element={<Chat />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/profile" exact element={<Profile />} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
