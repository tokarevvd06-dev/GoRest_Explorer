import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const TOKEN_KEY = '';

interface AuthState {
    token: string,
    isAuthenticated: boolean,
}

const loadToken = (): string => {
    try {
        return localStorage.getItem(TOKEN_KEY) || '';
    }
    catch (err) {
        console.log('ERROR: ', err);
        return '';
    }
}

const savedToken : string = loadToken();

const initialState : AuthState = {
    token: savedToken,
    isAuthenticated: savedToken.length > 0,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            try {
                localStorage.setItem(TOKEN_KEY, action.payload)
            }
            catch {
                console.log('localStorage недоступен')
            }
        },
        clearToken: (state) => {
            state.token = '';
            state.isAuthenticated = false;
            try {
                localStorage.removeItem(TOKEN_KEY);
            }
            catch {
                console.log('localStorage недоступен')
            }
        }
    },
})

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;