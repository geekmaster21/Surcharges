import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { createStyles } from '.';
import { FormattedMessage } from 'react-intl';

interface ModalProps {
    children?: any;
    showModal: boolean;
    className?: string;
    toggleModal?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialog: {
            background: theme.palette.primary.light,
            borderRadius: '8px',
        },
    }),
);

const Modal: React.SFC<ModalProps> = ({ showModal, children, toggleModal, className }) => {
    const [open, setOpen] = React.useState(showModal);

    function chromeColor(color: string) {
        (document.querySelector('meta[name="theme-color"]') as HTMLInputElement).setAttribute('content', color);
    }

    const handleClose = () => {
        toggleModal && toggleModal();
        setOpen(false);
        chromeColor('#E06902');
    };

    const handleEnter = () => {
        chromeColor('#703401');
    };

    const classes = useStyles();

    return (
        <Dialog
            closeAfterTransition
            onClose={handleClose}
            open={open || showModal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            classes={{ paper: classes.dialog }}
            onEntered={handleEnter}
            maxWidth="xs"
            fullWidth
        >
            {children}
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    <FormattedMessage
                        id="modal.close"
                        defaultMessage="Close" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export { Modal };
