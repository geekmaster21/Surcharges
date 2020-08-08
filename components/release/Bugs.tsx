import { Button, DialogContent, DialogTitle } from "@material-ui/core";
import { BugReportIcon, Modal } from "components/common";
import { IRelease } from "models";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import useStyles from "styles/mui/release";
import { SplitMsg } from "./Split-Msg";

interface BugsProps {
  release: IRelease;
  showLoader?: boolean;
}

const Bugs: React.SFC<BugsProps> = ({ release, showLoader }) => {
  const classes = useStyles();
  const [showModal, toggleModal] = useState(false);
  const handleModal = () => toggleModal(!showModal);
  const Title = () => (
    <FormattedMessage id="release.bugs" defaultMessage="Bugs" />
  );

  return release?.bugs ? (
    <>
      {showLoader ? (
        <span className={"shimmer-button " + classes.outlinedButton} />
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleModal}
          className={classes.outlinedButton + " " + classes.bug}
          startIcon={<BugReportIcon />}
        >
          <Title />
        </Button>
      )}

      <Modal showModal={showModal} toggleModal={handleModal}>
        <DialogTitle>
          <Title />
        </DialogTitle>
        <DialogContent dividers className="selectable">
          <SplitMsg msg={release.bugs} />
        </DialogContent>
      </Modal>
    </>
  ) : null;
};

export { Bugs };
