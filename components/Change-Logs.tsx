import { Button, DialogContent, DialogTitle } from '@material-ui/core';
import { DescriptionOutlined, Modal } from 'components';
import { IRelease } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { SplitMsg } from './Split-Msg';

interface ChangeLogsProps {
  release: IRelease;
  showLoader?: boolean;
}

const ChangeLogs: React.FunctionComponent<ChangeLogsProps> = ({
  release,
  showLoader,
}) => {
  const [showModal, toggleModal] = useState(false);
  const handleModal = () => toggleModal(!showModal);
  const classes = useStyles();
  const Title = () => (
    <FormattedMessage id='release.changeLogs' defaultMessage='Change Logs' />
  );

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
        <DialogTitle>
          <Title />
        </DialogTitle>
        <DialogContent dividers className='selectable'>
          <SplitMsg msg={release.changelog} />
        </DialogContent>
      </Modal>
    </>
  );
};

export { ChangeLogs };
