import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  messageInput: "",
  onlineUsersList:[],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessageInput:(state, action) =>{
        state.messageInput = action.payload;
    },
    setOnlineUsers:(state, action)=>{
      state.onlineUsersList = action.payload;
    }
  },
});
//If we click on a chat, we want to
export const { selectUser, setMessageInput, setOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;
