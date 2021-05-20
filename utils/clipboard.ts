import * as Sentry from '@sentry/nextjs';

function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    Sentry.captureException({
      __source__: 'util > clipboard',
      ...err,
    });
    Sentry.flush(2000);
  }

  document.body.removeChild(textArea);
}

export function CopyToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then();
}
