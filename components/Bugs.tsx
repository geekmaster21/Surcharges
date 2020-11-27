import { Button, DialogContent, DialogTitle, Icon } from '@material-ui/core';
import { BugReportIcon, HyperLink, Modal, Toast } from 'components';
import { IRelease } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, IsCSR, StopEvent } from 'utils';
import { SplitMsg } from './Split-Msg';

interface BugsProps {
  popup?: string;
  release: IRelease;
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
  const url = `${origin}/release/${release.codename}/${release.build_type}/${release.version}/${popupNames[1]}`;
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
          className={classes.outlinedButton + ' ' + classes.bug}
          startIcon={<BugReportIcon />}
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
            style={{
              color: 'white',
              margin: '-12px 0',
              height: 'fit-content',
            }}
          >
            <HyperLink fontSize='small' />
          </Icon>
        </DialogTitle>
        <DialogContent dividers className='selectable'>
          <SplitMsg msg={release.bugs} />
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

export { Bugs };
