import { CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <>
            <CircularProgress
                size={70}
                sx={{
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2
                }}
            />
        </>
    );
}

export default Loader;