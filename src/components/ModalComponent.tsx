import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { FC, ReactNode, useMemo } from 'react';

export type ModalProps = {
    children?: ReactNode;
    isOpen: boolean;
    handleClose: () => void;
    size?: "sm" | "md" | "lg";
    position?: "top" | "bottom" | "center";
}

const ModalComponent: FC<ModalProps> = ({ isOpen, handleClose, children, size, position }) => {
    const sizes = useMemo(() => {
        const _size = size || "sm";
        let _sizeR: number | string = 400;
        switch (_size) {
            case "sm":
                _sizeR;
                break;
            case "md":
                _sizeR = 750;
                break;
            case "lg":
                _sizeR = 1000;
                break;
            default:
                _sizeR;
                break;
        }
        return _sizeR
    }, [size])

    const positions = useMemo(() => {
        const _pos = position || "center";
        let top: number | string = '50%'
        switch (_pos) {
            case "center":
                top;
                break;
            case "top":
                top = "10%";
                break;
            case "bottom":
                top = "90%";
                break;
            default:
                top;
                break;
        }
        return top
    }, [position])

    const styles = useMemo(() => {
        const style = {
            position: 'absolute' as const,
            top: positions,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "100%",
            maxWidth: sizes,
            bgcolor: 'background.paper',
            p: 0,
            borderRadius: "10px",
            overflowY: "auto"
        };
        return style;
    }, [sizes, positions])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{ overflowY: 'auto', height: '100%' }}
        >
            <Fade in={isOpen}>
                <Box sx={styles}>
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalComponent;
