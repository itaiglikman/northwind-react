import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import UserModel from "../Models/UserModel";

// reducer for register:
// payload is new user:
function register(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    let registeredUser = action.payload;
    let newState = registeredUser;
    return newState;
}

// reducer for register:
// payload is token with data for logged user:
function login(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    let user = action.payload;
    let newState = user;
    return newState;

}
// reducer for register:
// payload is token with data for new user:
function logout(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    return null;
}

// create auth slice:
const authSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: { register, login, logout }
});

// expose actions creator:
export const authActionsCreator = authSlice.actions;

// expose reducers:
export const authReducersContainer = authSlice.reducer;