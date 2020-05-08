import React from 'react';
import { Theme } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

interface ModalProps {
    children?: any;
    showModal: boolean;
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

const Modal: React.SFC<ModalProps> = ({ showModal, children, toggleModal }) => {
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
