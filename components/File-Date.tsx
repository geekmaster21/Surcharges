import config from 'config';
import { IReleaseWithDetails } from 'models';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DayJs, GetCurrentLocale } from 'utils';

export interface FileDateProps {
  release: IReleaseWithDetails;
}

const pmsDayjsDate = async (
  date: number | Date | string,
  locale2use: string
) => {
  return await import(`dayjs/locale/${locale2use}.js`).then(x => {
    const dateFormat = x?.formats?.LLLL || 'dddd, D MMMM YYYY HH:mm';
    const dt = DayJs.unix(date as any)
      .locale(locale2use)
      .format(dateFormat);

    return dt;
  });
};

const FileDate: React.FunctionComponent<FileDateProps> = ({
  release: { date },
}) => {
  const router = useRouter();
  const localeLang = (
    GetCurrentLocale(false) ||
    router.locale ||
    config.locale.default
  ).toLowerCase();
  const locale = localeLang.split('-').shift() || '';
  const [state, setState] = useState('');

  useEffect(() => {
    pmsDayjsDate(date, locale)
      .then(x => setState(x))
      .catch(() => pmsDayjsDate(date, localeLang).then(x => setState(x)));
  }, [locale]);

  return <>{state}</>;
};

export default FileDate;
