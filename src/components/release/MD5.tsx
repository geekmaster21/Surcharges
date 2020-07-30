import { ListItemIcon, ListItemText } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { IRelease } from "../../models";
import { CopyToClipboard, StopEvent } from "../../utils";
import { VerifiedUserOutlined } from "../Icons";
import { LoadShimmer } from "../Load-Shimmer";
import { Modal } from "../Modal";
import { DialogContent, DialogTitle, ListItem } from "../React-Material";
import { useStylesRelease } from "./helpers";

interface MD5Props extends RouteComponentProps {
  release: IRelease;
  showLoader?: boolean;
}

const MD5: React.SFC<MD5Props> = ({ release, showLoader }) => {
  const classes = useStylesRelease();
  const [modal, setModal] = React.useState(false);
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
