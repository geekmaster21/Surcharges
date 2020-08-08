import { IconButton } from "@material-ui/core";
import { HyperLink, Toast } from "components/common";
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
      <Toast show={modal} onClose={toggleModal}>
        <FormattedMessage
          id="copy.info"
          defaultMessage="Copied to clipboard!"
        />
      </Toast>
    </>
  );
};
