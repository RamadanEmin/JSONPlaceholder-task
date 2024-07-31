import { Alert, Snackbar } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
    isOpen?: boolean;
    handleClose: () => void;
    children?: ReactNode;
    isAlert?: "error" | "success" | "warning"
}

export const SnackbarAlert: FC<Props> = ({ isOpen, handleClose, isAlert, children }) => {
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                onClose={handleClose}
                severity={isAlert}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {children}
            </Alert>
        </Snackbar>
    )
}