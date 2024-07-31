import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import {
    Box,
    Container,
    Divider,
    TextField, Typography, Button,
    IconButton,
    CircularProgress
} from '@mui/material';
import { createUser, selectUsers, updateUser, UserProps } from '@/stores/features/users/userReducers';
import ModalComponent from '@/components/ModalComponent';
import { Controller, useForm } from 'react-hook-form';
import 'react-international-phone/style.css';
import { Close } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/stores/Hooks';
import { SnackbarAlert } from './SnackbarAlert';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user?: UserProps;
    isUpdate?: boolean;
}

export const FormUser: FC<Props> = ({ isOpen, onClose, user, isUpdate }) => {
    const dispatch = useAppDispatch();
    const { pending } = useAppSelector(selectUsers);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isMessage, setIsMessage] = useState<string>("");

    const handleCloseAlert = () => {
        setIsSuccess(false);
        setIsMessage("");
    }

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<UserProps>({
        mode: "all",
        defaultValues: useMemo<UserProps>(
            () => ({
                name: user?.name,
                username: user?.username,
                address: {
                    street: user?.address?.street,
                    suite: user?.address?.suite,
                    zipcode: user?.address?.zipcode,
                    city: user?.address?.city,
                },
                company: {
                    name: user?.company?.name
                },
                email: user?.email,
            }),
            [user]
        ),
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user?.name,
                username: user?.username,
                address: {
                    street: user?.address?.street,
                    suite: user?.address?.suite,
                    zipcode: user?.address?.zipcode,
                    city: user?.address?.city,
                },
                company: {
                    name: user?.company?.name
                },
                email: user.email,
            })
        }
    }, [user]);

    const onSubmit = (item: UserProps) => {
        if (!isUpdate) {
            dispatch(createUser({˝
                data: item,
                isError: async (error) => {
                    console.log(error)
                },
                isSuccess: async () => {
                    onClose()
                    setIsSuccess(true)
                    setIsMessage("Create user is success.")
                }
            }))
        } else {
            dispatch(updateUser({
                id: user.id,
                data: item,
                isError: async (error) => {
                    console.log(error)
                },
                isSuccess: async () => {
                    onClose()
                    setIsSuccess(true)
                    setIsMessage("Update user is success.")
                }
            }))
        }
    }

    return (
        <Fragment>
            <ModalComponent isOpen={isOpen} handleClose={onClose} size='md' position='center'>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        p: 2
                    }}
                >
                    <Typography
                        variant="h5"
                        color="text.primary"
                    >
                        {isUpdate ? "Update user" : "Create new user"}
                    </Typography>

                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>

                <Divider />

                <Container
                    component="form"
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        py: 3
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography variant="h6">
                        Personal
                    </Typography>
                    <Box
                        component="div"
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr 1fr' },
                            gap: 2,
                        }}
                    >
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Controller
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Fullname"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message ? true : false}
                                    />
                                )}
                                name="name"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please fill fullname.",
                                    },
                                }}
                            />
                            {errors?.name &&
                                <Typography
                                    component="p"
                                    variant='body2'
                                    sx={{ color: 'red' }}
                                >{errors?.name?.message as string}</Typography>
                            }
                        </Box>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Controller
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message ? true : false}
                                    />
                                )}
                                name="username"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please fill username.",
                                    },
                                }}
                            />
                            {errors?.username &&
                                <Typography
                                    component="p"
                                    variant='body2'
                                    sx={{ color: 'red' }}
                                >{errors?.username?.message as string}</Typography>
                            }
                        </Box>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Controller
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message ? true : false}
                                    />
                                )}
                                name="email"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please fill email.",
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Email is invalid."
                                    }
                                }}
                            />
                            {errors?.email &&
                                <Typography
                                    component="p"
                                    variant='body2'
                                    sx={{ color: 'red' }}
                                >{errors?.email?.message as string}</Typography>
                            }
                        </Box>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            {errors?.email &&
                                <Typography
                                    component="p"
                                    variant='body2'
                                    sx={{ color: 'red' }}
                                >{errors?.email?.message as string}</Typography>
                            }
                        </Box>
                    </Box>

                    <Typography variant="h6">
                        Address
                    </Typography>
                    <Box
                        component="div"
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr 1fr' },
                            gap: 2,
                        }}
                    >
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Controller
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Suite"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message ? true : false}
                                    />
                                )}
                                name="address.suite"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please fill suite.",
                                    },
                                }}
                            />
                            {errors?.address?.suite &&
                                <Typography
                                    component="p"
                                    variant='body2'
                                    sx={{ color: 'red' }}
                                >{errors?.address?.suite?.message as string}</Typography>
                            }
                        </Box>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Controller
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="Street"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message ? true : false}
                                    />
                                )}
                                name="address.street"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please fill street.",
                                    },
                                }}
                            />
                            {errors?.address?.street &&
                                <Typography
                                    component="p"
                                    variant='body2'
                                    sx={{ color: 'red' }}
                                >{errors?.address?.street?.message as string}</Typography>
                            }
                        </Box>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Controller
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="ZIP Code"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message ? true : false}
                                    />
                                )}
                                name="address.zipcode"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please fill ZIP Code.",
                                    },
                                    pattern: {
                                        value: /^\d{5}(?:-\d{4})?$/,
                                        message: "ZIP Code is invalid."
                                    }
                                }}
                            />
                            {errors?.address?.zipcode &&
                                <Typography
                                    component="p"
                                    variant='body2'
                                    sx={{ color: 'red' }}
                                >{errors?.address?.zipcode?.message as string}</Typography>
                            }
                        </Box>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Controller
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        label="City"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message ? true : false}
                                    />
                                )}
                                name="address.city"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please fill city.",
                                    }
                                }}
                            />
                            {errors?.address?.city &&
                                <Typography
                                    component="p"
                                    variant='body2'
                                    sx={{ color: 'red' }}
                                >{errors?.address?.city?.message as string}</Typography>
                            }
                        </Box>
                    </Box>

                    <Typography variant="h6">
                        Company
                    </Typography>
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Controller
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    label="Company name"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    error={error?.message ? true : false}
                                />
                            )}
                            name="company.name"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Please fill company name.",
                                },
                            }}
                        />
                        {errors?.company?.name &&
                            <Typography
                                component="p"
                                variant='body2'
                                sx={{ color: 'red' }}
                            >{errors?.company?.name?.message as string}</Typography>
                        }
                    </Box>

                    <Button
                        type='submit'
                        variant="contained"
                        color="primary"
                        sx={{ py: 2 }}
                        disabled={!isValid || pending}
                    >
                        {pending ?
                            <Box sx={{ display: 'flex' }}>
                                <span>Loading...</span>
                                <CircularProgress size={20} />
                            </Box> : isUpdate ? "Update" : "Submit"
                        }
                    </Button>
                </Container>
            </ModalComponent>

            <SnackbarAlert
                isAlert='success'
                isOpen={isSuccess}
                handleClose={handleCloseAlert}
                children={isMessage}
            />
        </Fragment>
    )
}
