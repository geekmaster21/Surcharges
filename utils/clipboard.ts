import sentry from 'utils/sentry';

function copyClipboardFallback(text: string) {
  if (document) {
    const textArea = document.createElement('textarea');
    try {
      textArea.value = text;

      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      document.execCommand('copy');

      if (document.body.contains(textArea)) {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      sentry.error({
        __source__: 'utils/clipboard/fallback',
        copyText: text,
        ...err,
      });
    }
  }
}

function copyClipboard(text: string) {
  try {
    navigator.permissions
      .query({ name: 'clipboard-write' })
      .then(async () => await navigator.clipboard.writeText(text).then());
  } catch (err) {
    sentry.error({
      __source__: 'utils/clipboard/direct-copy',
      copyText: text,
      ...err,
    });
  }
}

export async function CopyToClipboard(text: string) {
  if (navigator.clipboard) {
    copyClipboard(text);
  } else {
    copyClipboardFallback(text);
  }
}
