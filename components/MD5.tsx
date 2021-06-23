import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Toast, VerifiedUserOutlined } from 'components';
import { IReleaseWithDetails } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, StopEvent } from 'utils';

type Props = {
  release: IReleaseWithDetails;
};

const MD5: React.FunctionComponent<Props> = ({ release }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleModal();
    CopyToClipboard(release.md5);
  }

  return release ? (
    <>
      <ListItem button>
        <ListItemIcon onClick={onCopyClick} id='list-item-icon'>
          <VerifiedUserOutlined className={classes.icon} />
        </ListItemIcon>

        <>
          <ListItemText
            primary='MD5'
            id='list-item-text'
            className={classes.md5}
            onClick={onCopyClick}
            secondary={release.md5}
          />
        </>
      </ListItem>

      {release?.md5 && (
        <Toast show={modal} onClose={toggleModal}>
          <FormattedMessage
            id='clipboardCopy'
            defaultMessage='Copied to clipboard!'
          />
        </Toast>
      )}
    </>
  ) : null;
};

export default MD5;
