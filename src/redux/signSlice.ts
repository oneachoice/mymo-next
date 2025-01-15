import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/** 로그인 상태 인터페이스 */
export interface SignState {
    status: boolean;
}

/** 로그인 상태의 초기 값  */
const initialState: SignState = {
    status: false
}

/** 로그인 상태를 전역 관리하기 위한 슬라이스입니다. */
export const signSlice = createSlice({
    name: "signedIn",
    initialState,
    reducers: {
        signIn: (state) => {
            state.status = true;
        },

        signOut: (state) => {
            state.status = false;
        }
    }
})

export const {signIn, signOut} = signSlice.actions;

export default signSlice.reducer;