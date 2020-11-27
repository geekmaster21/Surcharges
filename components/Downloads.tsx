import {
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Icon,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  Donations,
  GetAppIconOutlined,
  HyperLink,
  LaunchIcon,
  Modal,
  OpenOutside,
  PoweredBy,
  Toast,
} from 'components';
import { IRelease } from 'models';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, IsCSR, StopEvent } from 'utils';

interface DownloadsProps {
  popup?: string;
  release: IRelease;
  showLoader?: boolean;
}

const popupNames = ['download', 'downloads'];

const Downloads: React.FunctionComponent<DownloadsProps> = ({
  popup,
  release,
  showLoader,
}) => {
  let tmoDownload: NodeJS.Timeout;
  const classes = useStyles();
  const [showModal, toggleModal] = useState(popupNames.includes(popup!));
  const [tmoDirectLink, toggleTmoDirectLink] = useState(false);
  const [toast, setToast] = useState(false);
  const toggleToast = () => setToast(!toast);

  const handleModal = () => {
    clearTimeout(tmoDownload);
    toggleTmoDirectLink(false);
    toggleModal(!showModal);
  };

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleToast();
    CopyToClipboard(url);
  }

  const origin = IsCSR ? window.location.origin : '';
  const url = `${origin}/release/${release.codename}/${release.build_type}/${release.version}/${popupNames[1]}`;

  const Title = () => (
    <FormattedMessage id='release.download' defaultMessage='Downloads' />
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
          startIcon={<GetAppIconOutlined />}
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
        <DialogContent dividers>
          <OpenOutside
            className='link'
            style={{
              width: '100%',
              marginBottom: '10px',
              display: 'inline-block',
            }}
            href='https://wiki.orangefox.tech/en/guides'
          >
            <Alert severity='warning' variant='outlined'>
              <FormattedMessage
                id='modal.guide'
                defaultMessage='Installation Guide'
              />
            </Alert>
          </OpenOutside>

          <br />

          {!tmoDirectLink && (
            <Button
              variant='outlined'
              color='secondary'
              className={classes.downloadButton}
              startIcon={<CircularProgress size='18px' color='secondary' />}
            >
              <FormattedMessage
                id='modal.fetchLink'
                defaultMessage='Fetching Links'
              />
            </Button>
          )}

          {tmoDirectLink && (
            <>
              <Button
                color='secondary'
                variant='contained'
                disableElevation
                className={classes.downloadButton}
                startIcon={<GetAppIconOutlined />}
              >
                <OpenOutside
                  className='link no-hover inheritColor'
                  href={release.direct_url || release.url}
                >
                  <FormattedMessage
                    id='modal.directLink'
                    defaultMessage='Direct Link'
                  />
                </OpenOutside>
              </Button>

              {release?.sf?.url && (
                <>
                  <Button
                    color='secondary'
                    variant='outlined'
                    disableElevation
                    className={classes.downloadButton}
                    startIcon={<LaunchIcon />}
                  >
                    <OpenOutside
                      href={release?.sf?.url}
                      className='link no-hover inheritColor'
                    >
                      <FormattedMessage
                        id='modal.mirrorLink'
                        defaultMessage='Mirror Link'
                      />
                    </OpenOutside>
                  </Button>
                </>
              )}
            </>
          )}
          <br />
          <div className='links-in-dwld'>
            <PoweredBy />
            <Donations className='link flexd v-center' />
          </div>
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

export { Downloads };
