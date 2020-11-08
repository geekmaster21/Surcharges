import {
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {
  Image,
  Modal,
  SystemUpdateRoundedIcon,
  InstallStepper,
} from 'components';
import { IRelease } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';

interface DownloadsProps {
  release: IRelease;
  showLoader?: boolean;
}

const Install: React.FunctionComponent<DownloadsProps> = ({
  release,
  showLoader,
}) => {
  let tmoDownload: NodeJS.Timeout;
  const classes = useStyles();
  const [showModal, toggleModal] = useState(false);
  const [tmoDirectLink, toggleTmoDirectLink] = useState(false);
  const handleModal = () => {
    clearTimeout(tmoDownload);
    toggleTmoDirectLink(false);
    toggleModal(!showModal);
  };

  const Title = () => (
    <FormattedMessage id='release.install.button' defaultMessage='Install' />
  );

  if (showModal) {
    tmoDownload = setTimeout(() => toggleTmoDirectLink(true), 2500);
  }

  return release ? (
    <>
      {showLoader ? (
        <span className={'shimmer-button ' + classes.outlinedButton} />
      ) : (
        <Button
          variant='contained'
          disableElevation
          color='secondary'
          onClick={handleModal}
          className={classes.outlinedButton}
          startIcon={<SystemUpdateRoundedIcon />}
        >
          <Title />
        </Button>
      )}

      <Modal showModal={showModal} toggleModal={handleModal}>
        <DialogTitle>
          <Image alt='Connect to PC' src='/images/connect.svg' />
          <FormattedMessage
            id='release.install.dialog'
            defaultMessage='Quick install'
          />
        </DialogTitle>
        <DialogContent dividers>
          {!tmoDirectLink && <CircularProgress size='32px' color='secondary' />}
          {tmoDirectLink && <InstallStepper release={release} />}
        </DialogContent>
      </Modal>
    </>
  ) : null;
};

export { Install };
