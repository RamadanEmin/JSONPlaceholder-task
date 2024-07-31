import {
    Box,
    Button,
    Container,
    Typography
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/stores/Hooks';
import { getUsers, deleteUser, selectUsers, UserProps } from '@/stores/features/users/userReducers';
import { useEffect, useMemo, useState } from 'react';
import { Add } from '@mui/icons-material';
import { FormUser } from '@/components/FormUser';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SnackbarAlert } from '../components/SnackbarAlert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function UserPages() {
    const dispatch = useAppDispatch();
    const { users, pending } = useAppSelector(selectUsers);

    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
    const [formValue, setFormValue] = useState<UserProps>({});
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

    const filters = useMemo(() => {
        const params = {}
        return params
    }, []);

    useEffect(() => {
        dispatch(getUsers(filters))
    }, [filters])

    const UserData = useMemo(() => {
        const result: UserProps[] = []
        if (users?.length > 0) {
            users?.map((user) => {
                result.push({
                    ...user,
                })
            })
        }
        return result
    }, [users])

    const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
    const [isMessage, setIsMessage] = useState<string>("");

    const handleCloseAlert = () => {
        setIsMessage("");
        setIsOpenAlert(false);
    }

    const onDeleteUser = (id?: number | string) => {
        if (!id) return;
        dispatch(deleteUser({
            id,
            isSuccess: async () => {
                setIsOpenAlert(true);
                setIsMessage("User has been deleted.");
            },
            isError: async (error: any) => {
                console.log(error)
            }
        }))
    }

    return (
        <Container sx={{ mt: 10 }}>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        mb: 2,
                        display: "inline-flex",
                        alignItems: 'center',
                        gap: 1
                    }}
                    onClick={() => setIsOpenForm(true)}
                >
                    <Add />
                    <Typography variant="body2">
                        New user
                    </Typography>
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Id</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Username</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Company&nbsp;name</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {UserData.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.name}</StyledTableCell>
                                <StyledTableCell align="left">{row.username}</StyledTableCell>
                                <StyledTableCell align="left">{row.email}</StyledTableCell>
                                <StyledTableCell align="left">{row.company.name}</StyledTableCell>
                                <Button
                                    sx={{
                                        mr: 1,
                                        mt: 1
                                    }}
                                    variant="contained"
                                    onClick={() => {
                                        setIsOpenUpdate(true)
                                        setFormValue(row)
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    sx={{ mt: 1 }}
                                    variant="outlined"
                                    disabled={pending}
                                    onClick={() => onDeleteUser(row.id)}
                                >
                                    Delete
                                </Button>

                                <FormUser
                                    isOpen={isOpenUpdate}
                                    onClose={() => {
                                        setIsOpenUpdate(false)
                                        setFormValue({});
                                    }}
                                    user={formValue}
                                    isUpdate
                                />
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <FormUser
                isOpen={isOpenForm}
                onClose={() => {
                    setIsOpenForm(false)
                }}
            />
            <SnackbarAlert
                isAlert='success'
                isOpen={isOpenAlert}
                handleClose={handleCloseAlert}
                children={isMessage}
            />
        </Container>
    );
}