import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePoll, addPoll, updatePoll } from '../Actions/ActionsIndex';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        '& > *': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));

const EditPoll = () => {

    let history = useHistory()

    let dispatch = useDispatch();

    let { id } = useParams();

    const { poll } = useSelector(state => state.data)

    const [error, setError] = useState("")

    const classes = useStyles();

    const [state, setState] = useState({
        Name: "",
        Option_1: "",
        Option_2: "",
    });

    const { Name, Option_1, Option_2 } = state;

    const handleInputChange = (e) => {
        console.log(e.target.name);
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Name || !Option_1 || !Option_2) {
            setError("Please input all Field");
        } else {
            dispatch(updatePoll(state, id));
            history.push("/");
            setError("");
        }
    }

    useEffect(() => {
        if (poll) {
            setState({ ...poll })
        }
    }, [poll])

    useEffect(() => {
        dispatch(getSinglePoll(id))
    }, [])

    return (
        <div>
            <h2>Edit Poll</h2>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Name: " type="text"
                    value={Name || ""} onChange={handleInputChange} name="Name" />
                <br />

                <TextField id="standard-basic" label="Option_1:" type="text"
                    value={Option_1 || ""} onChange={handleInputChange} name="Option_1" />
                <br />

                <TextField id="standard-basic" label="Option_2:" type="text"
                    value={Option_2 || ""} onChange={handleInputChange} name="Option_2" />
                <br />

                <Button variant="contained" color="primary" type="submit" style={{ width: "100px" }}
                    onChange={handleInputChange}>
                    Update
                </Button>

                <Button variant="contained" color="secondary" type="submit" style={{ width: "100px" }}
                    onClick={() => history.push("/")}>
                    Go Back
                </Button>
            </form>

        </div>
    );
};

export default EditPoll;