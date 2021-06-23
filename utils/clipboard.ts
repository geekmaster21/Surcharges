import sentry from 'utils/sentry';

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
    sentry.error({
      __source__: 'utils/clipboard/fallback',
      ...err,
    });
  }
  if (document.body.contains(textArea)) {
    document.body.removeChild(textArea);
  }
}

export async function CopyToClipboard(text: string) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text).then();
    } else {
      fallbackCopyTextToClipboard(text);
    }
  } catch (err) {
    sentry.error({
      __source__: 'utils/clipboard/direct-copy',
      ...err,
    });
  }
}
