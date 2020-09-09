import {
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {
  Donations,
  GetAppIconOutlined,
  LaunchIcon,
  Modal,
  OpenOutside,
  PoweredBy,
} from 'components';
import { IRelease } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';

interface DownloadsProps {
  release: IRelease;
  showLoader?: boolean;
}

const Downloads: React.SFC<DownloadsProps> = ({ release, showLoader }) => {
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
        <DialogTitle>
          <Title />
        </DialogTitle>
        <DialogContent dividers>
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
    </>
  ) : null;
};

export { Downloads };
