import React, { useState } from 'react';
import { Link } from '@reach/router';
import { groupBy } from 'lodash';
import { Accordion } from '../../components';
import { IDevice, IDeviceGroup } from '../../models';

const List: React.SFC<{ data: IDevice[] }> = ({ data }) => {

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
        deviceLink = (code: string) => `/device/${code}`;

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
        <div className="list-container">

            <label className="matter-textfield-standard search">
                <input placeholder=" " onInput={onSearch} />
                <span>Search Device</span>
            </label>

            {/* List */}
            {
                hasList && (
                    <Accordion
                        multiple
                        data={list}
                        keyParent="oem"
                        Parent={parent => parent.oem}
                        Child={(child: IDeviceGroup) =>
                            (
                                <ul className="list no-list-style">
                                    {child.devices.map((m: IDevice) => (
                                        <Link key={m.codename} className="link" to={deviceLink(m.codename)}>
                                            <li className="card hover">
                                                <span className="name" >{m.modelname}</span>
                                                <span className="code">[ {m.codename} ]</span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )
                        } />
                )
            }

            {/* No results found */}
            {
                !hasList && filter && (
                    <div className="not-found">
                        Device not found!
                    </div>
                )
            }

        </div>
    );
}

export { List };
