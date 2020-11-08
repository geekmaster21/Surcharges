import { Backdrop, Button, Dialog, DialogActions } from '@material-ui/core';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/modal';

interface ModalProps {
  showModal: boolean;
  toggleModal?: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  showModal,
  children,
  toggleModal,
}) => {
  const [open, setOpen] = useState(showModal);

  function chromeColor(color: string) {
    (document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLInputElement).setAttribute('content', color);
  }

  const handleClose = () => {
    toggleModal && toggleModal();
    setOpen(false);
    chromeColor('#1C1D21');
  };

  const handleEnter = () => {
    chromeColor('#0D0E10');
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
      maxWidth='xs'
      fullWidth
    >
      {children}
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          <FormattedMessage id='modal.close' defaultMessage='Close' />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { Modal };
