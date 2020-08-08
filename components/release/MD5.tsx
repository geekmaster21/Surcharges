import {
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { LoadShimmer, Modal, VerifiedUserOutlined } from "components/common";
import { IRelease } from "models";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import useStyles from "styles/mui/release";
import { CopyToClipboard, StopEvent } from "utils";

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
              primary="MD5"
              onClick={onCopyClick}
              secondary={release.md5}
            />
          </>
        )}
      </ListItem>

      {release?.md5 && (
        <Modal showModal={modal} toggleModal={toggleModal}>
          <DialogTitle>
            <FormattedMessage id="copy.info" defaultMessage="Info" />
          </DialogTitle>
          <DialogContent dividers>MD5 copied to clipboard!</DialogContent>
        </Modal>
      )}
    </>
  ) : null;
};

export { MD5 };
