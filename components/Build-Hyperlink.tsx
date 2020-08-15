import { IconButton } from "@material-ui/core";
import { HyperLink, Toast } from "components";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { CopyToClipboard, GetCurrentLocale, IsCSR, StopEvent } from "utils";

type Props = {
  version?: string;
  codename?: string;
  buildType?: string;
};

export const BuildHyperLink = ({ codename, version, buildType }: Props) => {
  if (!codename || !buildType || !version) {
    return null;
  }
  const locale = GetCurrentLocale();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const origin = IsCSR ? window.location.origin : "";
  const url = `${origin}/${locale}/build/${codename}/${buildType}/${version}`;

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
          id="clipboardCopy"
          defaultMessage="Copied to clipboard!"
        />
      </Toast>
    </>
  );
};
