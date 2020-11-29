import { IconButton } from '@material-ui/core';
import { HyperLink, Toast } from 'components';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { CopyToClipboard, IsCSR, StopEvent } from 'utils';

type Props = {
  version?: string;
  codename?: string;
  buildType?: string;
};

export const BuildHyperLink = ({ codename, version, buildType }: Props) => {
  if (!codename || !buildType || !version) {
    return null;
  }
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const origin = IsCSR ? window.location.origin : '';
  const url = `${origin}/release/${codename}/${buildType}/${version}`;

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleModal();
    CopyToClipboard(url);
  }

  return (
    <>
      <IconButton
        color='primary'
        onClick={onCopyClick}
        style={{ color: 'white', margin: '-12px -4px', height: 'fit-content' }}
      >
        <HyperLink fontSize='small' />
      </IconButton>
      <Toast show={modal} onClose={toggleModal}>
        <FormattedMessage
          id='clipboardCopy'
          defaultMessage='Copied to clipboard!'
        />
      </Toast>
    </>
  );
};
