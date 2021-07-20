import config from 'config';
import { IRelease } from 'models';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DayJs, GetCurrentLocale } from 'utils';

export interface FileDateProps {
  release: IRelease;
}

const pmsDayjsDate = (date: number | Date | string, locale2use: string) =>
  import(`dayjs/locale/${locale2use}.js`).then(x =>
    DayJs.unix(date as any)
      .locale(locale2use)
      .format(x?.formats?.LLLL || 'dddd, D MMMM YYYY HH:mm')
  );

const FileDate: React.FunctionComponent<FileDateProps> = ({
  release: { date },
}) => {
  const router = useRouter();
  const localeLang = (
    GetCurrentLocale(false) ||
    router.locale ||
    config.locale.default
  ).toLowerCase();
  const [state, setState] = useState('');
  const locale = localeLang.split('-').shift() || '';

  useEffect(() => {
    if (date) {
      pmsDayjsDate(date, locale)
        .then(setState)
        .catch(() => pmsDayjsDate(date, localeLang).then(setState));
    }
  }, [locale, date]);

  return <>{state}</>;
};

export default FileDate;
