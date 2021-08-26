import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { deletePoll, loadPolls } from '../Actions/ActionsIndex';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        marginTop: 100,
        minWidth: 700,
    },
});


const Home = () => {

    const classes = useStyles();

    const buttonStyles = useButtonStyles();

    let dispatch = useDispatch();

    let history = useHistory();

    const { polls } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(loadPolls())
    }, []);

    const handleDelete = (id) => {

        // if (window.confirm("Are you sure wanted to delete the user ")) {
        //     dispatch(deletePoll(id))
        // }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePoll(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <div className={buttonStyles.root}>
                <Button variant="contained" color="primary"
                    onClick={() => history.push("/addPoll")}>
                    Add Poll
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name:</StyledTableCell>
                            <StyledTableCell align="center">Option_1</StyledTableCell>
                            <StyledTableCell align="center">OpId1</StyledTableCell>
                            <StyledTableCell align="center">Option_2</StyledTableCell>
                            <StyledTableCell align="center">OpId2</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {polls && polls.map((poll) => (
                            <StyledTableRow key={poll.id}>
                                <StyledTableCell component="th" scope="row">
                                    {poll.Name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{poll.Option_1}</StyledTableCell>
                                <StyledTableCell align="center">{poll.opId1}</StyledTableCell>
                                <StyledTableCell align="center">{poll.Option_2}</StyledTableCell>
                                <StyledTableCell align="center">{poll.opId2}</StyledTableCell>

                                <StyledTableCell align="center">
                                    <div className={buttonStyles.root}>
                                        <ButtonGroup
                                            variant="contained"
                                            aria-label="contained primary button group">

                                            <Button
                                                style={{ marginRight: "5px" }} color="secondary"
                                                onClick={() => handleDelete(poll.id)}>
                                                Delete
                                            </Button>

                                            <Button color="primary"
                                                onClick={() => history.push(`/EditPoll/${poll.id}`)}>
                                                Edit
                                            </Button>

                                        </ButtonGroup>
                                    </div>
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>


    );
};

export default Home;