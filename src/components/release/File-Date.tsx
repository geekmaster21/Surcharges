import React from 'react';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { IRelease } from '../../models';
import { GetCurrentLocale } from '../../utils';

export interface FileDateProps {
    release: IRelease;
}

const FileDate: React.SFC<FileDateProps> = ({ release: { date, unixtime } }) => {
    const locale = (GetCurrentLocale() || 'en').toLowerCase();
    const localeFirst = locale.split('-').shift() || '';
    const [unixDate, setUnixDate] = React.useState<string>(date);
    const formatUnixDate = (formatLLLL: string, _locale: string) => {
        const _date = dayjs.unix(unixtime).locale(_locale).format(formatLLLL);
        setUnixDate(_date);
        return _date;
    };
    const pms = async (_locale: string) => {
        return await import(`dayjs/locale/${_locale}`)
            .then(x => formatUnixDate(x?.formats?.LLLL || 'dddd, D MMMM YYYY HH:mm', _locale))
    }

    dayjs.extend(LocalizedFormat);
    if (unixtime && localeFirst)
        pms(localeFirst).catch(() => pms(locale));
    else if (unixDate !== date)
        setUnixDate(date);

    return <>{unixDate}</>;
}

export { FileDate };
