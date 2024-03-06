import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    showFriends:true,
}

export const actionSlice = createSlice({
    name:"action",
    initialState,
    reducers:{
        showFriendsDisplay:(state)=>{
            state.showFriends=true
        },
        showFriendsHide :(state)=>{
            state.showFriends = false
        }
    }
})
export const {showFriendsDisplay, showFriendsHide} = actionSlice.actions;
export default actionSlice.reducer;