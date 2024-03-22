import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  messageInput: "",
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
    }
  },
});
//If we click on a chat, we want to
export const { selectUser, setMessageInput } = chatSlice.actions;
export default chatSlice.reducer;
