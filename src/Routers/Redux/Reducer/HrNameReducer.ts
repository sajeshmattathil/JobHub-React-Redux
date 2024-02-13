interface HrLoginState {
    HR: string | null;
}

interface HrLoginAction {
    type: string;
    HrName: string;
}

const initialState: HrLoginState = {
    HR: null
}

const UserNameReducer = (state: HrLoginState = initialState, action: HrLoginAction): HrLoginState => {
    switch (action.type) {
        case 'USER_STATE':
            return {
                ...state,
                HR: action.HrName
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                HR: null
            }
        default:
            return state; 
    }
}

export default UserNameReducer
