import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

interface LoginUserParams {
    email: string;
    password: string;
}

interface LoginUserResponse {
    user: User;
    token: string;
}

interface ErrorMessage {
    msg: string;
}

const initialState: AuthState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const loginUser = createAsyncThunk<LoginUserResponse, LoginUserParams, { rejectValue: ErrorMessage }>(
    "user/LoginUser",
    async (user, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:7000/login", {
                email: user.email,
                password: user.password,
            });
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const message: ErrorMessage = { msg: err.response.data.msg };
                return thunkAPI.rejectWithValue(message);
            }
            return thunkAPI.rejectWithValue({ msg: "An unexpected error occurred" });
        }
    }
);

export const getMe = createAsyncThunk<User, void, { rejectValue: ErrorMessage }>(
    "user/getMe",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:7000/me");
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const message: ErrorMessage = { msg: err.response.data.msg };
                return thunkAPI.rejectWithValue(message);
            }
            return thunkAPI.rejectWithValue({ msg: "An unexpected error occurred" });
        }
    }
);

export const logOut = createAsyncThunk<void, void>("user/logOut", async () => {
    await axios.delete("http://localhost:7000/logout");
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginUserResponse>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.message = "";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.msg || "An unexpected error occurred";
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "";
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.msg || "An unexpected error occurred";
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
