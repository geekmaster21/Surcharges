import {
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { HyperLink, Modal, Toast } from 'components';
import { IReleaseWithDetails } from 'models';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, IsCSR, StopEvent } from 'utils';
import { SpeakerNotesOutlined } from './Icons';
import { LinkifyMessage } from './Linkify-Message';

interface BuildNotesProps {
  popup?: string;
  release: IReleaseWithDetails;
  showLoader?: boolean;
}

const popupNames = ['buildnote', 'buildnotes'];

const BuildNotes: React.FunctionComponent<BuildNotesProps> = ({
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

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleToast();
    CopyToClipboard(url);
  }

  const Title = () => (
    <FormattedMessage id='release.buildNotes' defaultMessage='Build Notes' />
  );

  return (
    <>
      {showLoader ? (
        <span className={'shimmer-button ' + classes.outlinedButton} />
      ) : (
        <Button
          color='secondary'
          variant='outlined'
          onClick={handleModal}
          className={classes.outlinedButton}
          startIcon={<SpeakerNotesOutlined />}
        >
          <Title />
        </Button>
      )}

      <Modal showModal={showModal} toggleModal={handleModal}>
        <DialogTitle className={classes.titleWithCopyIcon}>
          <Title />

          <IconButton
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
          <LinkifyMessage msg={release.notes!} />
        </DialogContent>
      </Modal>

      <Toast show={toast} onClose={toggleToast}>
        <FormattedMessage
          id='clipboardCopy'
          defaultMessage='Copied to clipboard!'
        />
      </Toast>
    </>
  );
};

export default BuildNotes;
