import React, { useState } from 'react';
import { Link } from '@reach/router';
import { IDevice } from '../../models';

const List: React.SFC<{ data: IDevice[] }> = ({ data }) => {

    const [list, setList] = useState<IDevice[]>(data),
        [filter, setFilter] = useState<string>(''),
        deviceLink = (code: string) => `/device/${code}`;

    const onSearch = ({ target: { value } }: any) => {
        const _filter = (value || '').trim().toLowerCase();
        setFilter(_filter);
        setList(doFilter(_filter));
    }

    const doFilter = (filter: string) => {
        const list = filter.trim() ? data.filter(f => {
            const items = [f.name.toLowerCase(), f.code.toLowerCase()];
            return items.some(i => i.includes(filter));
        }) : data;
        return [...list];
    }

    if (data.length && !filter && !list.length)
        setList(doFilter(''));

    const hasList = Boolean(list.length);

    return (<>
        <div className="list-container">
            <input type="text" className="search" placeholder="Search Device" onInput={onSearch} />

            {/* List */}
            {
                hasList && (
                    <ul className="list no-list-style">
                        {list.map(item => (
                            <Link key={item.code} className="link" to={deviceLink(item.code)}>
                                <li>{item.name}</li>
                            </Link>
                        ))}
                    </ul>
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
    </>);
}

export { List };
