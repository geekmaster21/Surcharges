import React from 'react';
import { IRelease } from '../../models';
import { DayJs, GetCurrentLocale } from '../../utils';

export interface FileDateProps {
    release: IRelease;
}

const FileDate: React.SFC<FileDateProps> = ({ release: { date, unixtime } }) => {
    const localeLang = (GetCurrentLocale() || 'en').toLowerCase();
    const locale = localeLang.split('-').shift() || '';
    const [unixDate, setUnixDate] = React.useState<string>(date);
    const pmsDayjsDate = async (locale2use: string) => {
        return await import(`dayjs/locale/${locale2use}`)
            .then(x => {
                const dateFormat = x?.formats?.LLLL || 'dddd, D MMMM YYYY HH:mm';
                const _date = DayJs.unix(unixtime).locale(locale2use).format(dateFormat);
                setUnixDate(_date);
            });
    }

    if (unixtime && locale)
        pmsDayjsDate(locale)
            .catch(() => pmsDayjsDate(localeLang)
                .catch(() => setUnixDate(date)));
    else if (unixDate !== date)
        setUnixDate(date);

    return <>{unixDate}</>;
}

export { FileDate };
