import { Backdrop, Button, Dialog, DialogActions } from '@material-ui/core';
import { PropsWithChildren, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/modal';

interface ModalProps {
  showModal: boolean;
  noClose?: boolean;
  toggleModal?: () => void;
}

const Modal = ({
  noClose,
  showModal,
  children,
  toggleModal,
}: PropsWithChildren<ModalProps>) => {
  const [open, setOpen] = useState(showModal);

  /*
  Don't remove; useful code
  function chromeColor(color: string) {
    (document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLInputElement).setAttribute('content', color);
  }
  onEntered = { handleEnter }*/

  const handleClose = () => {
    toggleModal && toggleModal();
    setOpen(false);
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
      maxWidth='xs'
      fullWidth
    >
      {children}
      {!noClose && (
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            <FormattedMessage id='modal.close' defaultMessage='Close' />
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export { Modal };
