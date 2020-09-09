import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { LoadShimmer, Toast, VerifiedUserOutlined } from 'components';
import { IRelease } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, StopEvent } from 'utils';

type Props = {
  release: IRelease;
  showLoader?: boolean;
};

const MD5: React.SFC<Props> = ({ release, showLoader }) => {
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
        <ListItemIcon onClick={onCopyClick}>
          <VerifiedUserOutlined className={classes.icon} />
        </ListItemIcon>

        {showLoader ? (
          <>
            <ListItemText
              primary={<LoadShimmer />}
              secondary={<LoadShimmer />}
            />
          </>
        ) : (
          <>
            <ListItemText
              primary='MD5'
              className={classes.md5}
              onClick={onCopyClick}
              secondary={release.md5}
            />
          </>
        )}
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

export { MD5 };
