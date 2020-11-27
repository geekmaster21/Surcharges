import { Button, DialogContent, DialogTitle, Icon } from '@material-ui/core';
import { DescriptionOutlined, HyperLink, Modal, Toast } from 'components';
import { IRelease } from 'models';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, IsCSR, StopEvent } from 'utils';
import { LinkifyMessage } from './Linkify-Message';

interface ChangeLogsProps {
  popup?: string;
  release: IRelease;
  showLoader?: boolean;
}

const popupNames = ['changelog', 'changelogs'];

const ChangeLogs: React.FunctionComponent<ChangeLogsProps> = ({
  popup,
  release,
  showLoader,
}) => {
  const [showModal, toggleModal] = useState(popupNames.includes(popup!));
  const handleModal = () => toggleModal(!showModal);
  const [toast, setToast] = useState(false);
  const toggleToast = () => setToast(!toast);
  const classes = useStyles();
  const Title = () => (
    <FormattedMessage id='release.changeLogs' defaultMessage='Change Logs' />
  );

  const origin = IsCSR ? window.location.origin : '';
  const url = `${origin}/release/${release.codename}/${release.build_type}/${release.version}/${popupNames[1]}`;

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleToast();
    CopyToClipboard(url);
  }

  return (
    <>
      {showLoader ? (
        <span className={'shimmer-button ' + classes.outlinedButton} />
      ) : (
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleModal}
          className={classes.outlinedButton}
          startIcon={<DescriptionOutlined />}
        >
          <Title />
        </Button>
      )}

      <Modal showModal={showModal} toggleModal={handleModal}>
        <DialogTitle className={classes.titleWithCopyIcon}>
          <Title />

          <Icon
            color='primary'
            onClick={onCopyClick}
            style={{ color: 'white', margin: '-12px 0', height: 'fit-content' }}
          >
            <HyperLink fontSize='small' />
          </Icon>
        </DialogTitle>
        <DialogContent dividers className='selectable'>
          <LinkifyMessage msg={release.changelog} />
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

export { ChangeLogs };
