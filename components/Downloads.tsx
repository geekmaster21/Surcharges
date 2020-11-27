import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  GetAppIconOutlined,
  HyperLink,
  Modal,
  OpenOutside,
  Toast,
} from 'components';
import { IRelease } from 'models';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, IsCSR, StopEvent } from 'utils';
import { AddToHomeScreenOutlinedIcon } from './Icons';

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
  const [dwnldModal, setDwnldModal] = useState(popupNames.includes(popup!));
  const [donateModal, setDonateModal] = useState(false);
  const [tmoDirectLink, toggleTmoDirectLink] = useState(false);
  const [toast, setToast] = useState(false);
  const toggleToast = () => setToast(!toast);

  const handleDwnldModal = () => {
    clearTimeout(tmoDownload);
    setDwnldModal(!dwnldModal);
    toggleTmoDirectLink(false);
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

  if (dwnldModal) {
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
          onClick={handleDwnldModal}
          className={classes.outlinedButton}
          startIcon={<GetAppIconOutlined />}
        >
          <Title />
        </Button>
      )}

      <Modal showModal={dwnldModal} toggleModal={handleDwnldModal}>
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
            <Alert
              severity='warning'
              variant='outlined'
              className={classes.alert}
              icon={<AddToHomeScreenOutlinedIcon fontSize='inherit' />}
            >
              <FormattedMessage
                id='modal.guide'
                defaultMessage='Got stuck? Read our documentations on how to install OrangeFox Recovery on your device.'
              />
            </Alert>
          </OpenOutside>

          <br />

          <div className={classes.downloadButton}>
            {!tmoDirectLink && (
              <span
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <CircularProgress size='18px' color='secondary' />
                <FormattedMessage
                  id='modal.fetchLink'
                  defaultMessage='Fetching Links'
                />
              </span>
            )}

            {tmoDirectLink && (
              <>
                <a
                  download
                  className='link no-hover inheritColor'
                  href={release.direct_url || release.url}
                  onClick={() => {
                    handleDwnldModal();
                    setDonateModal(true);
                  }}
                >
                  <GetAppIconOutlined fontSize='small' />
                  <FormattedMessage
                    id='modal.directLink'
                    defaultMessage='Direct Link'
                  />
                </a>

                {release.sf?.url && (
                  <a
                    download
                    href={release.sf.url}
                    onClick={() => {
                      handleDwnldModal();
                      setDonateModal(true);
                    }}
                    className='link no-hover inheritColor'
                  >
                    <GetAppIconOutlined fontSize='small' />

                    <FormattedMessage
                      id='modal.mirrorLink'
                      defaultMessage='Mirror Link'
                    />
                  </a>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Modal>

      <Modal
        noClose
        showModal={donateModal}
        toggleModal={() => setDonateModal(false)}
      >
        <DialogTitle>
          <FormattedMessage id='mainPage.donation' defaultMessage='Donations' />
        </DialogTitle>

        <DialogContent dividers>
          <FormattedMessage
            id='release.donation.info'
            defaultMessage='We hope you like the recovery. Donations keep the server running and help us build a better product for you. Would you like to donate?'
          />
        </DialogContent>

        <DialogActions>
          <OpenOutside
            title='Donations'
            className='link orange'
            onClick={() => setDonateModal(false)}
            href='https://opencollective.com/orangefox'
          >
            <Button color='primary' className='orange'>
              <FormattedMessage
                id='release.donation.yes'
                defaultMessage={`Yes, I'd like to donate`}
              />
            </Button>
          </OpenOutside>
          <Button onClick={() => setDonateModal(false)}>
            <FormattedMessage id='release.donation.no' defaultMessage='No' />
          </Button>
        </DialogActions>
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
