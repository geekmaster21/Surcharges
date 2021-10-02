import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  GetAppIconOutlined,
  HyperLink,
  Image,
  Modal,
  OpenOutside,
  Toast,
} from 'components';
import config from 'config';
import { IReleaseWithDetails } from 'models';
import React, { useState } from 'react';
// @ts-ignore
import emoji from 'react-easy-emoji';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, IsCSR, StopEvent } from 'utils';
import { AddToHomeScreenOutlinedIcon } from './Icons';

interface DownloadsProps {
  popup?: string;
  showLoader?: boolean;
  release: IReleaseWithDetails;
}

const popupNames = ['download', 'downloads'];

const Downloads: React.FunctionComponent<DownloadsProps> = ({
  popup,
  release,
  showLoader,
}) => {
  const classes = useStyles();
  const [dwnldModal, setDwnldModal] = useState(popupNames.includes(popup!));
  const [donateModal, setDonateModal] = useState(false);
  const [toast, setToast] = useState(false);
  const toggleToast = () => setToast(!toast);

  const handleDwnldModal = () => {
    setDwnldModal(!dwnldModal);
  };

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleToast();
    CopyToClipboard(url);
  }

  const origin = IsCSR ? window.location.origin : '';
  const url = `${origin}/release/${release._id!}/${popupNames[1]}`;

  const Title = () => (
    <FormattedMessage id='release.download' defaultMessage='Downloads' />
  );

  function allMirrors() {
    const { regions } = config;
    const keys = Object.keys(release.mirrors);
    const values = Object.values(release.mirrors);
    return keys.map((m, i) => {
      const region = regions.find(f => f.isoCode === m);
      return {
        ...region,
        url: values[i],
      };
    });
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
        <DialogContent dividers>
          <OpenOutside
            className='link'
            style={{
              width: '100%',
              marginTop: '8px',
              marginBottom: '14px',
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
            {allMirrors().map(m => (
              <a
                download
                key={m.region}
                href={m.url}
                className='link no-hover inheritColor downloadLink'
                onClick={() => {
                  handleDwnldModal();
                  setDonateModal(true);
                }}
              >
                <Button className={classes.downloadButton}>
                  <span>{emoji(m.flag)}</span>
                  <span>{m.region}</span>
                </Button>
              </a>
            ))}
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
          <Image
            alt='OrangeFox Donation'
            className='donation'
            src='/images/donate.png'
          />
          <span>
            <FormattedMessage
              id='release.donation.info'
              defaultMessage='We hope you like the recovery. Donations keep the server running and help us build a better product for you. Would you like to donate?'
            />
          </span>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDonateModal(false)}>
            <FormattedMessage id='release.donation.no' defaultMessage='No' />
          </Button>
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

export default Downloads;
