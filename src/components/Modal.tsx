import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MatModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

interface ModalProps {
    showModal: boolean;
    children?: any;
    toggleModal?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }),
);

const Modal: React.SFC<ModalProps> = ({ showModal, children, toggleModal }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(showModal);

    const handleClose = () => {
        toggleModal && toggleModal();
        setOpen(false);
    };

    return (
        <MatModal
            className={classes.modal}
            open={open || showModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 200,
            }}
        >
            {children}
        </MatModal>
    );
}

export { Modal }
