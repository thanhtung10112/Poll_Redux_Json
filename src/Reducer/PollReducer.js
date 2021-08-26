import * as types from "../Actions/ActionsType"

const initialState = {
    polls: [],
    poll: {},
    loading: false,
};

const PollReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_POLLS:
            return {
                ...state,
                polls: action.payload,
                loading: false,
            };

        case types.DELETE_POLLS:
            return {
                ...state,
                loading: false,
            }

        case types.ADD_POLLS:
            return {
                ...state,
                loading: false,
            }

        case types.GET_SINGLE_POLLS:
            return {
                ...state,
                poll: action.payload,
                loading: false,
            }

        case types.UPDATE_POLLS:
            return {
                ...state,
                loading: false,
            }


        default:
            return state;
    }
}

export default PollReducer;