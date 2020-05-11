import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { groupBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Input, List, ListItemIcon, ListItemText } from '../../components';
import { SearchIcon, ClearOutlinedIcon } from '../../components/Icons';
import { IDevice, IDeviceGroup } from '../../models';
import { GetCurrentLocale } from '../../utils';
import { useStyles } from './constants';

interface DeviceListProps {
    data: IDevice[];
    handleDeviceClick?: (d: IDevice) => void
}

const placeholders = [...Array(10).keys()];

const GroupList = (_data: IDevice[]) => {
    const arr: IDeviceGroup[] = [],
        obj = groupBy(_data, d => d.oem || 'Others');
    Object.keys(obj).forEach(key => {
        arr.push({
            oem: key,
            devices: obj[key]
        });
    });
    return arr;
}

const DeviceList: React.SFC<DeviceListProps> = ({ data, handleDeviceClick }) => {
    const classes = useStyles();
    const locale = GetCurrentLocale();
    const [list, setList] = useState<IDeviceGroup[]>(GroupList(data));
    const [filter, setFilter] = useState<string>('');

    const onDeviceClick = (dev: IDevice) => {
        const url = `/${locale}/device/${dev.codename}`;
        navigate(url);
        handleDeviceClick && handleDeviceClick(dev);
    };

    const onSearch = (value: any) => {
        const _filter = (value || '').toLocaleLowerCase();
        setFilter(_filter);
        if (_filter.trim() !== filter.trim())
            setList(doFilter(_filter));
    }

    const doFilter = (_filter: string) => {
        const _f = _filter.trim();
        const _data = data || [];
        const filteredData = _f.trim() ? _data.filter(f => {
            const items = [f.fullname.toLocaleLowerCase(), f.codename.toLocaleLowerCase()];
            return items.some(i => i.includes(_f));
        }) : _data;

        return GroupList(filteredData);
    }

    if (data?.length && !filter?.trim() && !list.length)
        setList(doFilter(''));

    const hasList = !data ? // data will be undefined if api errors out, this will also stop loading placeholder
        true :
        Boolean(list.length);

    return (
        <div className={classes.drawerContainer} >
            <div className={classes.drawerStickySearch}>
                <Input
                    size="small"
                    color="secondary"
                    variant="outlined"
                    disabled={!data}
                    value={filter}
                    onInput={e => onSearch((e?.target as any)['value'])}
                    style={{ width: 'calc(100% - 35px)' }}
                    endIcon={<>
                        {
                            filter && (
                                <ClearOutlinedIcon
                                    fontSize="small"
                                    className={classes.clearSearch}
                                    onClick={() => onSearch(null)}
                                />
                            )
                        }
                        <SearchIcon fontSize="small" />
                    </>}
                    label={
                        <FormattedMessage
                            id="deviceList.searchDevice"
                            defaultMessage="Search Device" />
                    }
                />
            </div>

            {
                // Device List
                hasList && (
                    <List
                        key={filter} // TODO: (remove this hack) if "filter" is persent, re-render list, with expanded groups
                        data={list}
                        keyParent="oem"
                        keyChildren="codename"
                        fieldChildren="devices"
                        expanded={filter?.trim().length > 1}
                        ContentParent={p => <ListItemText primary={p.oem} />}
                        ContentChild={c => (<>
                            <ListItemIcon>
                                <img
                                    alt="dev"
                                    src="/images/device.svg"
                                    className="device-list-item-icon"
                                />
                                {/* <SmartphoneOutlinedIcon style={{ color: '#ddd' }} /> */}
                            </ListItemIcon>
                            <ListItemText
                                primary={c.modelname}
                                secondary={c.codename} />
                        </>)}
                        onClickChild={c => onDeviceClick(c)}
                    />
                )
            }

            {
                // Loading Placeholder
                !hasList && !filter && (
                    <ul className="device-list-loading" >
                        {placeholders.map(m => <li key={m} ></li>)}
                    </ul>
                )
            }

            {
                // No results found
                !hasList && filter && (
                    <div style={{ textAlign: 'center' }}>
                        <FormattedMessage
                            id="deviceList.notFound"
                            defaultMessage="Device not found!" />
                    </div>
                )
            }

        </div>
    );
}

export { DeviceList };
