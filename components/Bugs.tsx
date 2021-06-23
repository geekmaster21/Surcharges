import {
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { BugReportOutlined, HyperLink, Modal, Toast } from 'components';
import { IReleaseWithDetails } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, IsCSR, StopEvent } from 'utils';
import { LinkifyMessage } from './Linkify-Message';

interface BugsProps {
  popup?: string;
  release: IReleaseWithDetails;
  showLoader?: boolean;
}

const popupNames = ['bug', 'bugs'];

const Bugs: React.FunctionComponent<BugsProps> = ({
  popup,
  release,
  showLoader,
}) => {
  const classes = useStyles();
  const [showModal, toggleModal] = useState(popupNames.includes(popup!));
  const handleModal = () => toggleModal(!showModal);
  const [toast, setToast] = useState(false);
  const toggleToast = () => setToast(!toast);
  const origin = IsCSR ? window.location.origin : '';
  const url = `${origin}/release/${release._id!}/${popupNames[1]}`;
  const Title = () => (
    <FormattedMessage id='release.bugs' defaultMessage='Bugs' />
  );

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleToast();
    CopyToClipboard(url);
  }

  return release?.bugs ? (
    <>
      {showLoader ? (
        <span className={'shimmer-button ' + classes.outlinedButton} />
      ) : (
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleModal}
          startIcon={<BugReportOutlined />}
          className={classes.outlinedButton + ' ' + classes.bug}
        >
          <Title />
        </Button>
      )}

      <Modal showModal={showModal} toggleModal={handleModal}>
        <DialogTitle className={classes.titleWithCopyIcon}>
          <Title />

          <IconButton
            id='bugs'
            color='primary'
            onClick={onCopyClick}
            style={{
              color: 'white',
              margin: '-12px -18px',
              height: 'fit-content',
            }}
          >
            <HyperLink fontSize='small' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className='selectable'>
          <LinkifyMessage msg={release.bugs} />
        </DialogContent>
      </Modal>

      <Toast show={toast} onClose={toggleToast}>
        <FormattedMessage
          id='clipboardCopy'
          defaultMessage='Copied to clipboard!'
        />
      </Toast>
    </>
  ) : null;
};

export default Bugs;
