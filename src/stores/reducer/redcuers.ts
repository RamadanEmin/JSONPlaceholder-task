// src/store/rootReducer.ts
import { combineReducers } from 'redux';
import userReducers from '@/stores/features/users/userReducers';

const rootReducer = combineReducers({
    users: userReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;