import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, TableRow, Paper, TableContainer, TableHead, Table, TableBody, TableCell} from '@material-ui/core';
import User from './models/User'
import Apis from "./services/Apis"
import AppBar from './components/AppBar';
import CustomDialog from './components/Dialog';
import db from "./services/indexedDB";

export default function App() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [users, setUser] = useState([] as User[]);
    const [item, setItem] = useState({} as User);
    useEffect(
        () => {
            getUsers();
        }, [],);

    async function getUsers() {
        let users = [] as User[];
        await db.get('users')
            .then((data: any) => data ? users = data : users = [] as User[]);
        if (users.length > 0) {
            setUser(users);
        } else {
            await Apis.getAll()
                .then((rs: any) => {
                    setUser(rs.data);
                    db.set('users', rs.data);
                })
        }
    }

    async function handleSelect(user: User) {
        await setItem(user);
        await setOpen(true);
    }

    return (
        <Container className={classes.root}>
            <AppBar title={"User List"}/>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Login</TableCell>
                            <TableCell>Profile URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tbody}>
                        {users.map((row, index) => (
                            <TableRow key={index} onClick={() => handleSelect(row)}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.login}</TableCell>
                                <TableCell>{row.html_url}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {open && <CustomDialog open={open} item={item} handleClose={() => setOpen(false)}/>}
        </Container>
    );
}

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    tbody: {
        cursor: 'pointer'
    },
    tableContainer: {
        marginTop: 50
    }
});
