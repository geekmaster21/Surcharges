import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { groupBy } from 'lodash';
import { Input, List, ListItemIcon, ListItemText } from '../../components';
import { PhoneAndroidIcon, SearchIcon } from '../../components/Icons';
import { IDevice, IDeviceGroup } from '../../models';

const DeviceList: React.SFC<{ data: IDevice[] }> = ({ data }) => {
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

    const [list, setList] = useState<IDeviceGroup[]>(GroupList(data)),
        [filter, setFilter] = useState<string>(''),
        onDeviceClick = ({ codename }: IDevice) => {
            const url = `/d/${codename}`;
            navigate(url);
        };

    const onSearch = ({ target: { value } }: any) => {
        const _filter = (value || '').trim().toLowerCase();
        setFilter(_filter);
        const _list = doFilter(_filter);
        setList(_list);
    }

    const doFilter = (_filter: string) => {
        const filteredData = _filter.trim() ? data.filter(f => {
            const items = [f.fullname.toLowerCase(), f.codename.toLowerCase()];
            return items.some(i => i.includes(_filter));
        }) : data;

        return GroupList(filteredData);
    }

    if (data.length && !filter && !list.length)
        setList(doFilter(''));

    const hasList = Boolean(list.length);

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
                endIcon={<SearchIcon />}
                onInput={onSearch}
            />
            {
                // Device List
                hasList && (
                    <List
                        data={list}
                        keyParent="oem"
                        keyChildren="codename"
                        fieldChildren="devices"
                        ContentParent={p => <ListItemText primary={p.oem} />}
                        ContentChild={c => (<>
                            <ListItemIcon>
                                <PhoneAndroidIcon style={{ color: '#ddd' }} />
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
