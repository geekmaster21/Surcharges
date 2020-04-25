import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { groupBy } from 'lodash';
import { Input, List, ListItemIcon, ListItemText } from '../../components';
import { SearchIcon, SmartphoneOutlinedIcon } from '../../components/Icons';
import { IDevice, IDeviceGroup } from '../../models';

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

    const [list, setList] = useState<IDeviceGroup[]>(GroupList(data)),
        [filter, setFilter] = useState<string>(''),
        onDeviceClick = (dev: IDevice) => {
            const url = `/device/${dev.codename}`;
            navigate(url);
            handleDeviceClick && handleDeviceClick(dev);
        };

    const onSearch = ({ target: { value } }: any) => {
        const _filter = (value || '').trim().toLowerCase();
        setFilter(_filter);
        setList(doFilter(_filter));
    }

    const doFilter = (_filter: string) => {
        const filteredData = _filter.trim() ? data.filter(f => {
            const items = [f.fullname.toLowerCase(), f.codename.toLowerCase()];
            return items.some(i => i.includes(_filter));
        }) : data;

        return GroupList(filteredData);
    }

    if (data?.length && !filter && !list.length)
        setList(doFilter(''));

    const hasList = !data ? // data will be undefined if api errors out, this will also stop loading placeholder
        true :
        Boolean(list.length);

    return (
        <div>
            <Input
                label="Search Device"
                variant="outlined"
                size="small"
                style={{
                    width: 'calc(100% - 35px)',
                }}
                color="secondary"
                endIcon={<SearchIcon fontSize="small" />}
                onInput={onSearch}
            />

            {
                // Device List
                hasList && (
                    <List
                        key={filter} // TODO: (remove this hack) if "filter" is persent, re-render list, with expanded groups
                        data={list}
                        keyParent="oem"
                        keyChildren="codename"
                        fieldChildren="devices"
                        expanded={filter?.length > 1}
                        ContentParent={p => <ListItemText primary={p.oem} />}
                        ContentChild={c => (<>
                            <ListItemIcon>
                                <SmartphoneOutlinedIcon style={{ color: '#ddd' }} />
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
                        Device not found!
                    </div>
                )
            }

        </div>
    );
}

export { DeviceList };
