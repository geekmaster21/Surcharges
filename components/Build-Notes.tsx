import { Button, DialogContent, DialogTitle } from '@material-ui/core';
import { Modal, SpeakerNotesOutlined } from 'components';
import { IRelease } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { SplitMsg } from './Split-Msg';

interface BuildNotesProps {
  release: IRelease;
  showLoader?: boolean;
}

const BuildNotes: React.SFC<BuildNotesProps> = ({ release, showLoader }) => {
  const classes = useStyles();
  const [showModal, toggleModal] = useState(false);
  const handleModal = () => toggleModal(!showModal);
  const Title = () => (
    <FormattedMessage id='release.buildNotes' defaultMessage='Build Notes' />
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
          startIcon={<SpeakerNotesOutlined />}
        >
          <Title />
        </Button>
      )}

      <Modal showModal={showModal} toggleModal={handleModal}>
        <DialogTitle>
          <Title />
        </DialogTitle>
        <DialogContent dividers className='selectable'>
          <SplitMsg msg={release.notes} />
        </DialogContent>
      </Modal>
    </>
  );
};

export { BuildNotes };
