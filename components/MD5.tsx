import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Toast, VerifiedUserOutlined } from 'components';
import { IRelease, Variants } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { CopyToClipboard, StopEvent } from 'utils';

type Props = {
  release: IRelease;
  variant: keyof Variants;
};

const MD5: React.FunctionComponent<Props> = ({ release, variant }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleModal();
    CopyToClipboard(release.variants[variant].md5);
  }

  return release ? (
    <>
      <ListItem button>
        <ListItemIcon onClick={onCopyClick}>
          <VerifiedUserOutlined className={classes.icon} />
        </ListItemIcon>

        <>
          <ListItemText
            primary='MD5'
            className={classes.md5}
            onClick={onCopyClick}
            secondary={release.variants[variant].md5}
          />
        </>
      </ListItem>

      {release.variants[variant]?.md5 && (
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
