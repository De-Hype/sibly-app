import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  selectedUser:null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    
    selectUser:(state, action)=>{
        state.selectedUser = action.payload;
    }
  },
});
//If we click on a chat, we want to 
export const {  selectUser } = chatSlice.actions;
export default chatSlice.reducer;
