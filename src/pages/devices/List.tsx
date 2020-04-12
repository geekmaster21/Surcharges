import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { getAllDeviceList } from '../../apis';
import { IDevice } from '../../models';

const List: React.SFC = () => {
    const [list, setList] = useState<IDevice[]>([]),
        [filter, setFilter] = useState<string>(''),
        [actualList, setActualList] = useState<IDevice[]>([]),
        deviceLink = (code: string) => `/device/${code}`;

    useEffect(() => {
        getAllDeviceList()
            .then(data => {
                setActualList(data);
                setList(doFilter());
            });
    }, []);

    function onSearch({ target: { value } }: any) {
        const _filter = (value || '').trim().toLowerCase();
        setFilter(_filter);
        setList(doFilter());
    }

    function doFilter() {
        const data = filter.trim() ? actualList.filter(f => {
            const items = [f.name.toLowerCase(), f.code.toLowerCase()];
            return items.some(i => i.includes(filter));
        }) : actualList;
        return [...data];
    }

    return (<>
        <div className="list-container">
            <input type="text" className="search" placeholder="Search Devices" value={filter} onChange={onSearch} />
            <ul className="list no-list-style">
                {list.map(item => (
                    <Link key={item.code} className="link" to={deviceLink(item.code)}>
                        <li>{item.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    </>);
}

export { List };
