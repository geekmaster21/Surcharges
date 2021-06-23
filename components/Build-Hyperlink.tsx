import { IconButton } from '@material-ui/core';
import { HyperLink, Toast } from 'components';
import { IRelease } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { CopyToClipboard, IsCSR, StopEvent } from 'utils';

const BuildHyperLink = (p?: { release: IRelease }) => {
  if (!p) {
    return null;
  }
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const origin = IsCSR ? window.location.origin : '';
  const url = `${origin}/release/${p.release._id}`;

  function onCopyClick(e: any) {
    StopEvent(e);
    toggleModal();
    CopyToClipboard(url);
  }

  return (
    <>
      <IconButton
        color='primary'
        id='build-hyperlink'
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

export default BuildHyperLink;
