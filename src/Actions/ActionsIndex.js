import axios from "axios"
import *  as types from "./ActionsType"

const getPolls = (polls) => ({
    type: types.GET_POLLS,
    payload: polls,
})

const PollDelete = () => ({
    type: types.DELETE_POLLS,
    // payload: 
})

const pollAdd = () => ({
    type: types.ADD_POLLS,
})

const EditPoll = (poll) => ({
    type: types.GET_SINGLE_POLLS,
    payload: poll,
})

const UpdatePoll = () => ({
    type: types.UPDATE_POLLS,
})


// show
export const loadPolls = () => {
    return function (dispatch) {
        axios
            .get(`${process.env.REACT_APP_API}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getPolls(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

// delete
export const deletePoll = (id) => {
    return function (dispatch) {
        axios
            .delete(`${process.env.REACT_APP_API}/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                // dispatch(PollDelete());
                dispatch(loadPolls());
            })
            .catch((error) => console.log(error));
    };
};

// Add
export const addPoll = (poll) => {
    return function (dispatch) {
        axios
            .post(`${process.env.REACT_APP_API}`, poll)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(pollAdd());
                dispatch(loadPolls());
            })
            .catch((error) => console.log(error));
    };
};

// Edit
export const getSinglePoll = (id) => {
    return function (dispatch) {
        axios
            .get(`${process.env.REACT_APP_API}/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                // dispatch(PollDelete());
                dispatch(EditPoll(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

export const updatePoll = (poll, id) => {
    return function (dispatch) {
        axios
            .put(`${process.env.REACT_APP_API}/${id}`, poll)
            .then((resp) => {
                console.log("resp", resp);
                // dispatch(PollDelete());
                dispatch(UpdatePoll());
            })
            .catch((error) => console.log(error));
    };
};