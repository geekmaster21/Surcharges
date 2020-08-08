import { DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import { HyperLink, Modal } from "components/common";
import { IRelease } from "models";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { CopyToClipboard, GetCurrentLocale, IsCSR, StopEvent } from "utils";

export const BuildHyperLink = (release: IRelease) => {
  const { codename, build_type, version } = release || ({} as IRelease);
  if (!codename || !build_type || !version) {
    return null;
  }
  const locale = GetCurrentLocale();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const origin = IsCSR ? window.location.origin : "";
  const url = `${origin}/${locale}/build/${codename}/${build_type}/${version}`;

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleModal();
    CopyToClipboard(url);
  }

  return (
    <>
      <IconButton
        onClick={onCopyClick}
        color="primary"
        style={{ color: "white", margin: "-12px 0" }}
      >
        <HyperLink fontSize="small" />
      </IconButton>
      <Modal showModal={modal} toggleModal={toggleModal}>
        <DialogTitle>
          <FormattedMessage id="copy.info" defaultMessage="Info" />
        </DialogTitle>
        <DialogContent dividers>
          <FormattedMessage
            id="release.copy"
            defaultMessage="Link copied to clipboard!"
          />
          <br />
          <a
            className="link orange selectable"
            href={url}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            {url}
          </a>
        </DialogContent>
      </Modal>
    </>
  );
};
