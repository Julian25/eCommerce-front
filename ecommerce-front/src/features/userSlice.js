import {createSlice} from '@reduxjs/toolkit';
import appApi from '../services/appApi';

const initialState = null;

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logOut: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.login.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.increaseCartProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.decreaseCartProduct.matchFulfilled, (_, { payload }) => payload);
    },
})

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
