import {
    Action,
    AnyAction,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "@/stores/reducer/redcuers";

import AxiosInstance, { AxiosRequestConfig } from 'axios';

const axios = AxiosInstance.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});

const prefix = "/users";

export type UserProps = {
    id?: number,
    name?: string,
    username?: string,
    email?: string,
    address?: {
        street?: string,
        suite?: string,
        city?: string,
        zipcode?: string,
        geo?: {
            lat?: string | number,
            lng?: string | number
        }
    },
    phone?: string,
    website?: string,
    company?: {
        name?: string,
        catchPhrase?: string,
        bs?: string
    },
    avatar?: string
}

export type UserStateProps = {
    users: UserProps[];
    pending: boolean;
    error: boolean;
    message?: string;
};

const initialState: UserStateProps = {
    users: [],
    pending: false,
    error: false,
    message: "",
};

interface HeadersConfigurationProps {
    headers: {
        "Content-Type"?: string;
        Accept?: string;
    };
    params?: AxiosRequestConfig
}

let config: HeadersConfigurationProps = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

interface RejectedAction extends Action {
    error: Error;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith("rejected");
}

interface UserActionProps {
    id?: string | number;
    data?: UserProps;
    isSuccess: () => Promise<void>;
    isError: (error: any) => Promise<void>;
}

export const getUsers = createAsyncThunk<any, AxiosRequestConfig, { state: RootState }>(
    "get-users",
    async (params) => {
        config = {
            ...config,
            params: params
        }
        try {
            const response = await axios.get(prefix, config);
            const { data, status } = response;
            if (status == 200) {
                return data;
            } else {
                throw response;
            }
        } catch (error: any) {
            const { data, status } = error.response;
            const newError: any = { message: data?.error?.message };
            if (status === 404) {
                throw new Error("User not found");
            } else {
                throw new Error(newError.message);
            }
        }
    }
);

export const createUser = createAsyncThunk<any, UserActionProps, { state: RootState }>(
    "create-user",
    async (formData) => {
        try {
            const response = await axios.post(prefix, formData.data, config);
            const { data, status } = response;
            if (status == 201) {
                await formData.isSuccess();
                return data;
            } else {
                throw response;
            }
        } catch (error: any) {
            const { data, status } = error.response;
            const newError: any = { message: data?.error?.message };
            await formData.isError(newError);
            if (status === 404) {
                throw new Error("User not found");
            } else {
                throw new Error(newError.message);
            }
        }
    }
);

export const updateUser = createAsyncThunk<any, UserActionProps, { state: RootState }>(
    "update-user",
    async (formData) => {
        try {
            const response = await axios.patch(`${prefix}/${formData?.id}`, formData.data, config);
            const { data, status } = response;
            if (status == 200) {
                await formData.isSuccess();
                return data;
            } else {
                throw response;
            }
        } catch (error: any) {
            const { data, status } = error.response;
            const newError: any = { message: data?.error?.message };
            await formData.isError(newError);
            if (status === 404) {
                throw new Error("User not found");
            } else {
                throw new Error(newError.message);
            }
        }
    }
);

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetUsers(state) {
            state.users = [];
            state.pending = false;
            state.error = false;
            state.message = "";
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                return {
                    ...state,
                    pending: true,
                };
            })
            .addCase(getUsers.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    pending: false,
                    error: false,
                    users: payload,
                };
            })
            .addCase(getUsers.rejected, (state, { error }) => {
                state.pending = false;
                state.error = true;
                state.message = error.message;
            })

            .addCase(createUser.pending, (state) => {
                return {
                    ...state,
                    pending: true,
                };
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    pending: false,
                    error: false,
                    users: [...state.users, payload],
                };
            })
            .addCase(createUser.rejected, (state, { error }) => {
                state.pending = false;
                state.error = true;
                state.message = error.message;
            })

            .addCase(updateUser.pending, (state) => {
                return {
                    ...state,
                    pending: true,
                };
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                const updatedUsers = state.users.map((user) => {
                    if (user?.id === payload?.id) {
                        user = payload
                    }
                    return user;
                });
                return {
                    ...state,
                    pending: false,
                    error: false,
                    users: updatedUsers,
                };
            })
            .addCase(updateUser.rejected, (state, { error }) => {
                state.pending = false;
                state.error = true;
                state.message = error.message;
            })

            .addMatcher(isRejectedAction, (state, action) => {
                const base = {
                    ...state,
                    ...action.error,
                };
                return base;
            })
            .addDefaultCase((state, action) => {
                const base = {
                    ...state,
                    ...action,
                };
                return base;
            });
    },
});

const userReducers = userSlice.reducer;

export const selectUsers = (state: RootState) => state.users;
export const { resetUsers } = userSlice.actions;

export default userReducers;