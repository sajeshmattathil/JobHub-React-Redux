interface userLoginState {
    user: string | null;
}

interface userLoginAction {
    type: string;
    userName: string;
}

const initialState: userLoginState = {
    user: null
}

const UserNameReducer = (state: userLoginState = initialState, action: userLoginAction): userLoginState => {
    switch (action.type) {
        case 'USER_STATE':
            return {
                ...state,
                user: action.userName
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state; 
    }
}

export default UserNameReducer
